import urllib.request
import json

url = "https://hiykohhpxogniosdowjo.supabase.co/rest/v1/"
headers = {
    "apikey": "sb_publishable_9BGxNUPQ2XGuOH437-4PuA_lIaAzv0_",
    "Authorization": "Bearer sb_publishable_9BGxNUPQ2XGuOH437-4PuA_lIaAzv0_"
}

req = urllib.request.Request(url, headers=headers)
try:
    with urllib.request.urlopen(req) as response:
        schema = json.loads(response.read().decode())
        definitions = schema.get("definitions", {})
        
        for table_name in ["players", "match_results", "player_scores", "gk_scores", "awards", "videos"]:
            if table_name in definitions:
                print(f"Table: {table_name}")
                props = definitions[table_name].get("properties", {})
                for prop, details in props.items():
                    print(f"  - {prop}: {details.get('type')} (format: {details.get('format')})")
            else:
                print(f"Table: {table_name} not found in definitions")
except Exception as e:
    print(f"Error: {e}")
