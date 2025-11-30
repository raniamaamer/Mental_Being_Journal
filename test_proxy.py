import urllib.request
import json

# Test POST to Next.js frontend (should be proxied to Flask)
url = 'http://localhost:3000/api/register'
data = {
    'email': 'test_proxy@example.com',
    'password': 'password123',
    'name': 'Test Proxy User'
}

json_data = json.dumps(data).encode('utf-8')
headers = {'Content-Type': 'application/json'}

print(f"Testing POST to {url}...")
req = urllib.request.Request(url, data=json_data, headers=headers, method='POST')

try:
    with urllib.request.urlopen(req) as response:
        print(f"Status Code: {response.getcode()}")
        print(f"Response Headers: {response.info()}")
        print(f"Response: {response.read().decode('utf-8')}")
except urllib.error.HTTPError as e:
    print(f"HTTP Error: {e.code}")
    print(f"Response: {e.read().decode('utf-8')}")
except Exception as e:
    print(f"Error: {e}")
