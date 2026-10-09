import requests
import json

NVIDIA_KEY = "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"

r = requests.post(
    "https://integrate.api.nvidia.com/v1/chat/completions",
    headers={"Authorization": f"Bearer {NVIDIA_KEY}", "Content-Type": "application/json"},
    json={
        "model": "nvidia/nemotron-3.5-lightning-30b-a3b",
        "messages": [{"role": "user", "content": "Return JSON with a key 'message' and value 'Hello World'"}],
        "response_format": {"type": "json_object"},
        "max_tokens": 50
    },
    timeout=20
)

print(r.status_code)
print(r.text)
