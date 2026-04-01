import requests
import time
import uuid

# --- Hardcoded per your request ---
API_KEY = "9497084123a14e4daf7de074362af7d5"
AMPLITUDE_URL = "https://api2.amplitude.com/2/httpapi"

# --- Values taken from the JSON you provided earlier ---
DEVICE_ID = "d10bc9b1-5a35-477a-b1dd-3f637b147138"
SESSION_ID = 1771844182511
INSERT_ID = "3ea51960-4d8d-4417-ab95-f5d1aa47b1dd"  # original insert_id (kept for reference)
PLATFORM = "Web"
BROWSER_LANGUAGE = "en-US"
IP = "$remote"
LIBRARY = "amplitude-ts/2.33.4"
USER_AGENT = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36"

PAGE_DOMAIN = "web.run"
PAGE_LOCATION = "https://web.run/"
PAGE_TITLE = "Online Code Runner - Python, JavaScript, PHP, SQL | Web.run"
PAGE_URL = "https://web.run/"

def send_prompt(prompt_text: str):
    payload = {
        "api_key": API_KEY,
        "events": [
            {
                # core event metadata (some values reused from your payload)
                "device_id": DEVICE_ID,
                "session_id": SESSION_ID,
                "time": int(time.time() * 1000),
                "platform": PLATFORM,
                "language": BROWSER_LANGUAGE,
                "ip": IP,
                "insert_id": str(uuid.uuid4()),  # new insert_id to avoid duplicate ingestion
                "event_type": "Prompt",
                "event_properties": {
                    # include the user's prompt (raw) and contextual fields from your original payload
                    "prompt": prompt_text,
                    "original_insert_id": INSERT_ID,
                    "original_event_type": "Explain Code",
                    "library": LIBRARY,
                    "user_agent": USER_AGENT,
                    "[Amplitude] Page Domain": PAGE_DOMAIN,
                    "[Amplitude] Page Location": PAGE_LOCATION,
                    "[Amplitude] Page Title": PAGE_TITLE,
                    "[Amplitude] Page URL": PAGE_URL,
                    "[Amplitude] Previous Page Location": "",
                    "[Amplitude] Previous Page Type": "direct",
                }
            }
        ]
    }

    try:
        resp = requests.post(AMPLITUDE_URL, json=payload, timeout=10)
        # Print raw response exactly as received
        print(resp.status_code)
        print(resp.text)
    except requests.RequestException as e:
        print("ERROR:", str(e))

if __name__ == "__main__":
    prompt = input("Enter your prompt: ")
    send_prompt(prompt)