import time, random
import requests

server_url = "http://127.0.0.1:8000/sensors"

def send_data():
    return{
            "esp_id": "ESP32_01",
            "api_key": "abc123",
            "data": {
                        "temperature":random.randint(30,40),
                        "humidity": random.randint(60,90),
                        "pressure": random.randint(1030,1140)
                    }
}

while True:
    data = send_data()
    try:
        response = requests.post(f"{server_url}", json=data)
        print(f"Data sent: {data}, Response: {response.status_code}")
    except requests.exceptions.RequestException as e:
        print(f"Error sending data: {e}")
    time.sleep(1)