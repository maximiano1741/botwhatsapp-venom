/* eslint-disable prettier/prettier */
import { storage } from '../storage.js'
import { VenomBot } from '../venom.js'
import { STAGES } from './index.js'

export const initialStage = {
  async exec({ from }) {
    storage[from].stage = STAGES.MENU

    const venombot = await VenomBot.getInstance()

    const message = `
      _👋Olá Viajante!_   
        👨‍💻Tudo bem! 
       _Seja bem-vindo(a) ao canal_
       _de Venda por Whatsapp 
       ✨ *Agente Credenciado Grupo*                                   
       🚍  *S A R I T U R*
       🚍  *G A R D E N I A
       🚍  *G  U  A  N  A  B  A  R  A*
       🚍  *G  O N T I J O*
       ---------------------------------
        📍${venombot.getSessionName}.

        🔰 O Horário de atendimento é:
        ✔️  Todos os dias
        🕒 das 09:00 às 12:45
        🕒 das 14:00 às 19:00
        ✔️ Horário de almoço Fechado:
        🕒 Das 12:45 às 14:00
       ---------------------------------                                                                                                                                              
        Posso te ajudar? 🙋‍♂️
        1️⃣ - _COMPRAR PASSAGEM_
        2️⃣ - _ENCOMENDA_
        3️⃣ - _VIAGEM TREM_
        4️⃣ - _BATE VOLTA - (BRÁS -SP)_
        0️⃣ - _INFORMAÇÃO_
    `
    await venombot.sendText({ to: from, message })
  },
}
