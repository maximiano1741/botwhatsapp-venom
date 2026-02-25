import { VenomBot } from '../venom.js'
import { storage } from '../storage.js'
import { STAGES } from './index.js'

export const stageFour = {
  async exec({ from, message }) {
    const address = storage[from].address
    const phone = from.split('@')

    storage[from].stage = STAGES.FALAR_COM_ATENDENTE

    storage[from].finalStage = {
      startsIn: new Date().getTime(),
      endsIn: new Date().setSeconds(60), // 1 minute of inactivity
    }

    const itens = storage[from].itens
    const desserts = itens.map((item) => item.description).join(', ')
    const total = storage[from].itens.length

    const msg = `🔔 *NOVO PEDIDO* 🔔: \n\n📞 Cliente: +${
      phone[0]
    } n🚍 EMPRESA: *${desserts}* \n🚚 Valor: *a confirmar*. \n📍 Endereço: *${message}* \n💰 Valor: *${
          total * 0
    },00 reais*. \n⏳ Tempo de viagem: *0:00 minutos*. \n🛑 Detalhes: *${message}*`

    await VenomBot.getInstance().sendText({ to: from, message: msg })
  },
}
