import csv

def search(search):
    with open ('apikeys.csv') as csvfile:
        reader = csv.DictReader(csvfile)
        key = reader['Ebay']
    api_url = "http://svcs.ebay.com/services/search/FindingService/v1?"
    payload = { 'OPERATION-NAME' : findItemsByKeywords,
                'SERVICE-VERSION' : '1.0.0',
                'SECURITY-APPNAME' : key,
                'keywords' : search}
    dictionary = requests.get(api_url, params=payload)
    ret = []
    for thing in dictionary:
        items = result['items']
        sub = [items['title'], items['snippet'], items['link']]
        ret.append(sub)
    return ret
