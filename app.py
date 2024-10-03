import streamlit as st
from faq import obter_resposta

# Título da página
st.title("Chatbot com Streamlit")

# Caixa de entrada para o usuário digitar a mensagem
user_message = st.text_input("Digite sua pergunta:")

# Exibe a resposta do bot quando o botão é clicado
if st.button("Enviar"):
    if user_message:
        # Converte a mensagem para minúsculas e obtém a resposta
        bot_response = obter_resposta(user_message.lower())
        st.write(f"Bot: {bot_response}")
    else:
        st.write("Por favor, digite uma mensagem.")
