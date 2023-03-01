
from flask import Flask, jsonify, request

app = Flask(__name__)

@app.route('/chatbot', methods=['POST'])
def chatbot():
    data = request.get_json()
    message = data['message']
    response = {'message': 'This is a response from the chatbot!'}
    return jsonify(response)

if __name__ == '__main__':
  app.run()


