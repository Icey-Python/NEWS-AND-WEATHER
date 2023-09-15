from flask import Flask, render_template,request
from flask_cors import CORS,cross_origin
import requests
app = Flask(__name__)
CORS(app)
@app.route("/")
def greet():
  return 'Hello World!'

@app.route("/<var>")
def get_user(var):
  return render_template("user_tag.html",username=var)

#proxy loc data from service
@app.route("/proxy_location/<key>")
@cross_origin()
def proxy_data(key):
  loc = request.args.get('q')
  loc_key = request.args.get('location_key')
  if(len(key)>8):
    #get location key from coords
    if (loc != ''):
      resp = requests.get(f"http://dataservice.accuweather.com/locations/v1/cities/geoposition/search?apikey={key}&q={loc}")
      data = resp.json()
    #get location weather
    else:
      data = 'parameter q is required'
  else:
    data = "Please Enter a valid key"
  return data

#proxy weather from service
@app.route("/proxy_weather/<loc_key>")
@cross_origin()
def get_weather_data(loc_key):
  key = request.args.get('api_key')
  print(loc_key,key)
  if(loc_key):
        resp = requests.get(f"https://dataservice.accuweather.com/currentconditions/v1/{loc_key}?apikey={key}")
        data = resp.json()
  else:
    data = "You did not pass in a required parameter"
  return data
if __name__ == "__main__":
  app.run(host='0.0.0.0', port=5000)