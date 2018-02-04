const Poloniex = require('poloniex-api-node');

function PoloniexWrapper(apiKey, secret) {

    const poloniex = new Poloniex(apiKey, secret, { nonce: () => new Date().getTime() });

    this.Type = require("./apiTypes").POLONIEX;

    this.prices = async function() {
        const ticker = await poloniex.returnTicker();
        const prices = {};
        Object.keys(ticker).forEach(pair => {
            const baseAndQuote = pair.split("_");
            const symbol = `${baseAndQuote[1]}_${baseAndQuote[0]}`;
            prices[symbol] = ticker[pair].last;
        });
        return prices;
    }

}

module.exports = PoloniexWrapper;