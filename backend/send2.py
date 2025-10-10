import requests, random, time

url ="http://127.0.0.1:8000/sensorData/fromesp"
while True:
    payload = {
        "device_id": "18fcff3d-128b-4b2a-befd-38fc6d608179",
        "data" :{
            "temperature" : random.randrange(30,40),
            "humidity" : random.randrange(60,80)
        }
    }
    try:
        response = requests.post(url, json=payload)
    except Exception as e:
        print(e)

    time.sleep(1)