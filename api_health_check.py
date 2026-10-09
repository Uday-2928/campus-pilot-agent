import requests
import json
import sys

# Fix Windows encoding
sys.stdout.reconfigure(encoding='utf-8')

GEMINI_KEY = "YOUR_GEMINI_KEY"
NVIDIA_KEY = "YOUR_NVIDIA_KEY"
GROQ_KEY = "YOUR_GROQ_KEY"

results = {}

print("=" * 50)
print("API KEY HEALTH CHECK")
print("=" * 50)

# --- TEST 1: Gemini ---
print("\n[1/3] Testing Gemini (gemini-2.0-flash)...")
try:
    r = requests.post(
        f"https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key={GEMINI_KEY}",
        headers={"Content-Type": "application/json"},
        json={"contents": [{"parts": [{"text": "Reply with only: WORKING"}]}]},
        timeout=15
    )
    if r.ok:
        text = r.json()['candidates'][0]['content']['parts'][0]['text']
        print(f"  [OK] Gemini WORKING - Response: {text.strip()}")
        results['gemini'] = 'WORKING'
    else:
        print(f"  [FAIL] Gemini FAILED - {r.status_code}: {r.text[:200]}")
        results['gemini'] = f'FAILED ({r.status_code})'
except Exception as e:
    print(f"  [ERROR] Gemini ERROR - {e}")
    results['gemini'] = f'ERROR: {e}'

# --- TEST 2: NVIDIA ---
print("\n[2/3] Testing NVIDIA (nemotron-3.5-lightning-30b-a3b)...")
try:
    r = requests.post(
        "https://integrate.api.nvidia.com/v1/chat/completions",
        headers={"Authorization": f"Bearer {NVIDIA_KEY}", "Content-Type": "application/json"},
        json={
            "model": "nvidia/nemotron-3.5-lightning-30b-a3b",
            "messages": [{"role": "user", "content": "Reply with only: WORKING"}],
            "max_tokens": 10
        },
        timeout=20
    )
    if r.ok:
        text = r.json()['choices'][0]['message']['content']
        print(f"  [OK] NVIDIA WORKING - Response: {text.strip()}")
        results['nvidia'] = 'WORKING'
    else:
        print(f"  [FAIL] NVIDIA FAILED - {r.status_code}: {r.text[:200]}")
        results['nvidia'] = f'FAILED ({r.status_code})'
except Exception as e:
    print(f"  [ERROR] NVIDIA ERROR - {e}")
    results['nvidia'] = f'ERROR: {e}'

# --- TEST 3: Groq ---
print("\n[3/3] Testing Groq (llama-3.3-70b-versatile)...")
try:
    r = requests.post(
        "https://api.groq.com/openai/v1/chat/completions",
        headers={"Authorization": f"Bearer {GROQ_KEY}", "Content-Type": "application/json"},
        json={
            "model": "llama-3.3-70b-versatile",
            "messages": [{"role": "user", "content": "Reply with only: WORKING"}],
            "max_tokens": 10
        },
        timeout=15
    )
    if r.ok:
        text = r.json()['choices'][0]['message']['content']
        print(f"  [OK] Groq WORKING - Response: {text.strip()}")
        results['groq'] = 'WORKING'
    else:
        print(f"  [FAIL] Groq FAILED - {r.status_code}: {r.text[:300]}")
        results['groq'] = f'FAILED ({r.status_code})'
except Exception as e:
    print(f"  [ERROR] Groq ERROR - {e}")
    results['groq'] = f'ERROR: {e}'

print("\n" + "=" * 50)
print("SUMMARY:")
for k, v in results.items():
    icon = "[OK]" if v == "WORKING" else "[FAIL]"
    print(f"  {icon} {k.upper()}: {v}")
print("=" * 50)

