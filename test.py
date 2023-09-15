from flask import Flask, render_template

app = Flask(__name__)

@app.route("/")
def greet():
  return 'Hello World!'

@app.route("/<var>")
def get_user(var):
  return render_template("user_tag.html",username=var)
  
if __name__ == "__main__":
  app.run(host='0.0.0.0', port=5000)
