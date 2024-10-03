# from flask import Flask, render_template, request, jsonify

# app = Flask(__name__)

# # Rota principal para renderizar a página HTML
# @app.route('/')
# def index():
#     return render_template('index.html')

# # Rota para processar a pergunta e retornar a resposta
# @app.route('/get_response', methods=['POST'])
# def get_response():
#     user_message = request.json.get('message').lower()  # Pega a mensagem do usuário e converte para minúsculas

#     # Processamento de perguntas específicas
#     if "qual é o seu nome" in user_message:
#         bot_response = "Meu nome é ChatBot!"
#     elif "como você está" in user_message:
#         bot_response = "Estou funcionando perfeitamente, obrigado por perguntar!"
#     elif "qual é a capital da bahia" in user_message:
#         bot_response = "A capital da Bahia é Salvador."
#     else:
#         bot_response = "Desculpe, não entendi sua pergunta. Tente perguntar de outra forma."

#     return jsonify({"response": bot_response})

# if __name__ == '__main__':
#     app.run(debug=True)# app.py


from flask import Flask, render_template, request, jsonify
from faq import obter_resposta

app = Flask(__name__)

# Rota principal para renderizar a página HTML
@app.route('/')
def index():
    return render_template('index.html')

# Rota para processar a pergunta e retornar a resposta
@app.route('/get_response', methods=['POST'])
def get_response():
    user_message = request.json.get('message').lower()  # Pega a mensagem do usuário e converte para minúsculas
    
    # Obtém a resposta normalizada
    bot_response = obter_resposta(user_message)

    return jsonify({"response": bot_response})

if __name__ == '__main__':
    app.run(debug=True)



