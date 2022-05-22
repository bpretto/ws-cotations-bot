// import { create, Whatsapp } from 'venom-bot';
import { hgApi } from "./hgApi";
const venom = require('venom-bot');

venom
    .create({
        session: 'session-name', //name of session
        multidevice: false // for version not multidevice use false.(default: true)
    })
    .then((client) => start(client))
    .catch((erro) => {
        console.log(erro);
    });

function start(client) {
    client.onMessage(async (message) => {
        // if (message.isGroupMsg === false) {
        if (message.body === '.index') {
            // index(message, client)
            let res = await hgApi.get("/quotations?key=a3d96c22");
            res = res.data.results
            console.log(res)
            const text = `💲 *MOEDAS* 💲
💵 Dólar: R$${res.currencies.USD.buy}
📊 Variação: ${res.currencies.USD.variation}%

💶 Euro: R$${res.currencies.EUR.buy}
📊 Variação: ${res.currencies.EUR.variation}%

💷 Libra: R$${res.currencies.GBP.buy}
📊 Variação: ${res.currencies.GBP.variation}%

₿ BITCOIN: R$${res.currencies.BTC.buy}
📊 Variação: ${res.currencies.BTC.variation}%



👜 *BOLSAS* 👜
🇧🇷 B3: ${res.stocks.IBOVESPA.points} pts.
📊 Variação: ${res.stocks.IBOVESPA.variation}%

🇧🇷 IFIX: ${res.stocks.IFIX.points} pts.
📊 Variação: ${res.stocks.IFIX.variation}%

🇺🇸 NASDAQ: ${res.stocks.NASDAQ.points} pts.
📊 Variação: ${res.stocks.NASDAQ.variation}%

🇺🇸 DOW JONES: ${res.stocks.DOWJONES.points} pts.
📊 Variação: ${res.stocks.DOWJONES.variation}%
`
            client
                .sendText(message.from, text)
                .then((result) => {
                    console.log('Result: ', result); //return object success
                })
                .catch((erro) => {
                    console.error('Error when sending: ', erro); //return object error
                });
        }
        // }
    });
}

export { venom };