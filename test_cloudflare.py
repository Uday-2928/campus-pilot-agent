import requests
import sys

# Fix Windows encoding
sys.stdout.reconfigure(encoding='utf-8')

account_id = "18aea7ec07c0d05aa3f920cf0ee8cf2f"
cf_token = "cfat_TRWHSzPjlg3e4FEzBmfhGqvUUO6LxLPoNJwuOz9Lfee10311"

# Using LLaMA 3.1 8B on Cloudflare Workers AI
invoke_url = f"https://api.cloudflare.com/client/v4/accounts/{account_id}/ai/run/@cf/meta/llama-3.1-8b-instruct"
stream = True

headers = {
    "Authorization": f"Bearer {cf_token}",
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
  "stream": stream
}

print("Testing Cloudflare Workers AI...")
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
