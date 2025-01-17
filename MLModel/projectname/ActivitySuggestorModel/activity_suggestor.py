from langchain_core.pydantic_v1 import BaseModel, Field

class ActivitySuggestor(BaseModel):
    Activity:str =Field(description="Activity name")
    Description:str =Field(description="Description of the activity")
    Benefits:str =Field(description="Benefits acheived from the activity")
    Timings:str =Field(description="Timings when activity should be done")
    Reward:str =Field(description="Rewards acheived after completion of activity in form of coins")
