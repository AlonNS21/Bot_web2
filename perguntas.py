# perguntas.py

def pergunta_nome():
    return "qual é o seu nome"

def pergunta_como_esta():
    return "como você está"

def pergunta_capital_bahia():
    return "qual é a capital da bahia"

def pergunta_capital_franca():
    return "qual a capital da frança"

def pergunta_credor_pagamento_fatura():
    return "como incluir credor no pagamento fatura"  # Nova pergunta

def carregar_perguntas():
    """Retorna uma lista de perguntas associadas com suas funções de respostas"""
    from respostas import resposta_nome, resposta_como_esta, resposta_capital_bahia, resposta_capital_franca, resposta_credor_pagamento_fatura

    return [
        (pergunta_nome(), resposta_nome),
        (pergunta_como_esta(), resposta_como_esta),
        (pergunta_capital_bahia(), resposta_capital_bahia),
        (pergunta_capital_franca(), resposta_capital_franca),
        (pergunta_credor_pagamento_fatura(), resposta_credor_pagamento_fatura)  # Nova pergunta associada à função de resposta
    ]
