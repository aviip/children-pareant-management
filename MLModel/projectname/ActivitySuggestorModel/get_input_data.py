import requests


def get_data():
    # resposne=requests.get('API url here')
    # if response.status_code==200:
    #     data=response.json()
    data={
        'Interest':['Adventure','Drawing','Hiking','Puzzle Solving'],
        'Available Time':[
            '9:30-10:30 am',
            '5:00-7:00 pm',
            '10:00 pm-11:00 pm'
        ]
    }
    return data