import csv
import requests
import codecs

def search(search):
    reader = csv.DictReader(codecs.open('apikeys.csv','rU', 'utf-16'))
    for row in reader:
        type = row['API']
        key = row.get('API')
        if type == 'Ebay':
            use_key = key        
    api_url = "http://svcs.ebay.com/services/search/FindingService/v1?"
    payload = { 'OPERATION-NAME' : 'findItemsByKeywords',
                'SERVICE-VERSION' : '1.0.0',
                'SECURITY-APPNAME' : use_key,
                'keywords' : search}
    r = requests.get(api_url, params=payload)
    r = r.json()
    ret = []
    for result in r['item']:
        sub = {}
        sub['title'] = result['title']
        sub['image'] = result['galleryURL']
        sub['price'] = result['currentPrice']
        ret.append(sub)
    return ret
