import requests, random, time

url ="http://127.0.0.1:8000/sensorData"
while True:
    payload = {
        "data" :{
            "co2" : random.randrange(30,40)
        }
    }
    try:
        response = requests.post(url, json=payload)
    except Exception as e:
        print(e)

    time.sleep(1)