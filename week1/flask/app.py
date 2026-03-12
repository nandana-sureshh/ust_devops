from flask import Flask, render_template, jsonify

app = Flask(_name_)

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/health")
def health():
    return jsonify({"status": "running"})

if _name_ == "_main_":
    app.run(debug=True)