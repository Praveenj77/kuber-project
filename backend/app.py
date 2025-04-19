from flask import Flask, request, jsonify

app = Flask(__name__)

storage = []

@app.route('/')
def home():
    return "<h1>Backend Running</h1>"

@app.route('/submit', methods=['POST'])
def submit():
    try:
        data = request.get_json(force=True)
        storage.append(data)
        return jsonify({
            "message": "Data received successfully",
            "received": data
        }), 200
    except Exception as e:
        return jsonify({ "error": str(e) }), 400

@app.route('/data', methods=['GET'])
def get_data():
    try:
        return jsonify(storage)
    except Exception as e:
        return jsonify({"error": str(e)}), 500


if __name__ == '__main__':
    app.run(debug=True, port=5000 , host='0.0.0.0') 