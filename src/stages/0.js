import { storage } from '../storage.js'
import { VenomBot } from '../venom.js'
import { STAGES } from './index.js'

export const initialStage = {
  async exec({ from }) {
    storage[from].stage = STAGES.MENU

    const venombot = await VenomBot.getInstance()

    const message = `
      👋 Olá, Viajante!
      👨‍💻Tudo bem!, Seja bem-vindo(a) ao canal de
       *atendimento * da ${venombot.getSessionName}.
      *Posso te ajudar?* 🙋‍♂️
      -----------------------------------
      1️⃣ - COMPRAR PASSAGEM
      2️⃣ - ENCOMENDA
      0️⃣ - INFORMAÇÃO
    `
    await venombot.sendText({ to: from, message })
  },
}
