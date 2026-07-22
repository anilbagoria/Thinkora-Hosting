import json
import urllib.request
import urllib.error

url = 'https://thinkora-backend-en7h.onrender.com/api/v1/auth/sendotp'
data = json.dumps({'email': 'test@example.com', 'checkUserPresent': True}).encode('utf-8')
req = urllib.request.Request(url, data=data, headers={'Content-Type': 'application/json'})
try:
    with urllib.request.urlopen(req, timeout=20) as r:
        print('STATUS', r.status)
        print(r.read().decode())
except urllib.error.HTTPError as e:
    print('STATUS', e.code)
    print(e.read().decode())
except Exception as e:
    print('ERROR', str(e))
