import { numbers, VenomBot } from '../venom.js'
import { menu } from '../menu.js'
import { storage } from '../storage.js'
import { neighborhoods } from './neighborhoods.js'
import { initialStage } from './0.js'
import { STAGES } from './index.js'

export const stageOne = {
  async exec(params) {
    const message = params.message.trim()
    const isMsgValid = /[0|1|2|3|4]/.test(message)

    let msg =
      '❌ *Digite uma opção válida, por favor.* \n⚠️ ```APENAS UMA OPÇÃO POR VEZ``` ⚠️'

    if (isMsgValid) {
      const option = options[Number(message)]()
      msg = option.message
      storage[params.from].stage = option.nextStage || STAGES.INICIAL
    }

    await VenomBot.getInstance().sendText({ to: params.from, message: msg })

    if (storage[params.from].stage === STAGES.INICIAL) {
      await initialStage.exec(params)
    } else if (storage[params.from].stage === STAGES.FALAR_COM_ATENDENTE) {
      storage[params.from].finalStage = {
        startsIn: new Date().getTime(),
        endsIn: new Date().setSeconds(60), // 1 minute of inactivity
      }
    }
  },
}

const options = {
  1: () => {
    let message = '🚍 - _Qual empresa deseja atendimento?_\n\n'

    Object.keys(menu).forEach((value) => {
      message += `${numbers[value]} - _${menu[value].description}_ \n`
    })

    return {
      message,
      nextStage: STAGES.CARRINHO,
    }
  },
  2: () => {
    const message =
      '\n-----------------------------------\n1️⃣ - ```FAZER PEDIDO``` \n0️⃣ - ```FALAR COM ATENDENTE```\n\n'

    return {
      message,
      nextStage: null,
    }
  },
  0: () => {
    return {
      message:
        '🔃 Encaminhando você para um atendente. \n⏳ *Aguarde um instante*.\n \n⚠️ A qualquer momento, digite *ENCERRAR* para encerrar o atendimento. ⚠️',
      nextStage: STAGES.FALAR_COM_ATENDENTE,
    }
  },
}


