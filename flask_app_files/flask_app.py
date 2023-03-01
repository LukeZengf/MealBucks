
from flask import Flask, jsonify, request
import chatbot

bot = chatbot.ChatBot()
app = Flask(__name__)

@app.route('/chatbot', methods=['POST'])
def send_to_chatbot():
    data = request.get_json()
    message = data['message']
    # Add your chatbot logic here

    model_response = bot.get_message(message)
    response = {'message': model_response}
    return jsonify(response)

if __name__ == '__main__':
    print("ready")
    app.run()
