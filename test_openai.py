import requests
import sys

# Fix Windows encoding
sys.stdout.reconfigure(encoding='utf-8')

invoke_url = "https://api.openai.com/v1/chat/completions"
stream = True
openai_key = "YOUR_OPENAI_KEY"

headers = {
    "Authorization": f"Bearer {openai_key}",
    "Accept": "text/event-stream" if stream else "application/json",
    "Content-Type": "application/json"
}

payload = {
  "messages": [
    {
      "role": "user",
      "content": "What is 2 + 2? Please explain briefly."
    }
  ],
  "model": "gpt-4o-mini",
  "max_tokens": 512,
  "stream": stream
}

print("Testing OpenAI API...")
response = requests.post(invoke_url, headers=headers, json=payload, stream=stream)

if response.status_code != 200:
    print(f"Error {response.status_code}: {response.text}")
    sys.exit(1)

if stream:
    for line in response.iter_lines():
        if line:
            print(line.decode("utf-8"))
else:
    print(response.json())
