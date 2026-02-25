import { VenomBot } from '../venom.js'
import { storage } from '../storage.js'
import { STAGES } from './index.js'

export const stageThree = {
  async exec({ from, message }) {
    storage[from].address = message
    storage[from].stage = STAGES.PEDIDO

    let msg = 'Pedido *CANCELADO* com sucesso. \n Volte Sempre!'
    if (message === '*') {
      storage[from].stage = STAGES.INICIAL
    } else {
      const itens = storage[from].itens
      const desserts = itens.map((item) => item.description).join(', ')

      const total = storage[from].itens.length

      msg =
        `🗒️ *Aqui está o resumo da sua viagem:*: \n\n🚍 EMPRESA: *${desserts}* \n🚚 Valor: *a confirmar*. \n📍 Endereço: *${message}* \n💰 Valor: *${
          total * 0
         },00 reais*. \n⏳ Tempo de viagem: *0:00 minutos*. \n\n` +
        '🔊 ```Agora, informe a forma de pagamento e se vai precisar de troco, por gentileza.```'
    }

    await VenomBot.getInstance().sendText({ to: from, message: msg })

    // return '✅ *Prontinho, pedido feito!* \n\Você ainda não sabe o valor, vou te passar para um atendente*. \n\n⏳ *Aguarde um instante*.'
  },
}
