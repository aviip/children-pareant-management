from django.shortcuts import render
from .ActivitySuggestorModel.activity_suggestor import ActivitySuggestor
from .ActivitySuggestorModel.get_input_data import get_data
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain.prompts import PromptTemplate
from langchain_core.output_parsers import JsonOutputParser
from django.http import JsonResponse

def form(request,*args, **kwargs):
    return render(request,"info.html",{})

def activity_data(request,*args,**kwargs):
    model = ChatGoogleGenerativeAI(
        model="gemini-1.5-pro",
        api_key='AIzaSyD8-disvMK2_QG5guNwCJrrTg1aYYDGnkM'
    )

    data = get_data()
    interest = data['Interest']
    timings = data['Available Time']

    # context_getter=GetContext()
    # context=context_getter.get_result(interest)
    parser = JsonOutputParser(pydantic_object=ActivitySuggestor)
    template = """
    Your job is to:
     - Suggest activites to the childern depending upon their interests and which will be fun helpful in their 
       physical and mental growth.
     - Give brief description about suggested activites.
     - Give the benefits that can be acheived after the completion of activity.
     - Timings for completing the activity.
     - Rewards that can be acheived after completing the activity.

    **Note:
     - The rewards should be given depending upon how challenging or creative the activity was.The rewads should be in form of
      coins.
     - The timings for the activity should be given based upon the available time slots and appropriate time for that activity.
     - The output should be in form of json so don't use double quotes within the text.

    Child Interests:
    {interest}
    Available Time Slots:
    {time_slot}

    The ouput should be in the following form:
    {format_instructions}

    Suggest 9 activites in the above format
    """

    prompt = PromptTemplate.from_template(template=template,
                                          input_variable=['interest', 'time_slot'],
                                          partial_variables={"format_instructions": parser.get_format_instructions()})

    chain = prompt | model | parser

    results=chain.invoke({'interest': interest, 'time_slot': timings})

    return JsonResponse(results,safe=False)


