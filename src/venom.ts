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
            const text = `*MOEDAS*
Dólar: ${res.currencies.USD.sell}
Variação: ${res.currencies.USD.variation}%

Euro: ${res.currencies.EUR.sell}
Variação: ${res.currencies.EUR.variation}%

Libra: ${res.currencies.GBP.sell}
Variação: ${res.currencies.GBP.variation}%

BIT COIN: ${res.currencies.BTC.sell}
Variação: ${res.currencies.BTC.variation}%



*BOLSAS*
B3: ${res.stocks.IBOVESPA.points}
Variação: ${res.stocks.IBOVESPA.variation}%

IFIX: ${res.stocks.IFIX.points}
Variação: ${res.stocks.IFIX.variation}%

NASDAQ: ${res.stocks.NASDAQ.points}
Variação: ${res.stocks.NASDAQ.variation}%

DOW JONES: ${res.stocks.DOWJONES.points}
Variação: ${res.stocks.DOWJONES.variation}%
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