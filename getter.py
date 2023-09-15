import requests
from bs4 import BeautifulSoup
API_url= "http://127.0.0.1:5000/Icey Splice"
resp = requests.get(API_url)
data = resp.content

soup = BeautifulSoup(data,'html.parser')
username_text = soup.find('div',{'class':'username'}).get_text()
print(username_text)

