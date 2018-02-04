function BinanceWrapper(apiKey, secret, test) {

    const binance = require('node-binance-api');

    const SupportedTradeAssets = [
        "BTC","ETH","BNB","USDT"
    ];

    binance.options({
        'APIKEY': apiKey,
        'APISECRET': secret,
        test: test
    });

    this.Type = require('./apiTypes').BINANCE;

    this.prices = function() {
        return new Promise((resolve, reject) => {
            binance.prices(response => {
                if (response.msg){
                    reject(response.msg)
                } else {
                    const prices = {};
                    Object.keys(response).forEach(pair => {
                        const tradingAsset = getTradingAssetFromSymbol(pair);
                        let base = pair.replace(tradingAsset, "");
                        base = base.replace("BCC", "BCH");
                        const symbol = `${base}_${tradingAsset}`;
                        prices[symbol] = response[pair];
                    });
                    resolve(prices);
                }
            });
        });
    };

    this.marketBuy = async function(symbol, quantityPercent) {
        const tradingAsset = getTradingAssetFromSymbol(symbol);
        const balanceForAsset = await getBalanceForAsset(tradingAsset);
        console.log("balanceForAsset:", balanceForAsset);
        const symbolPrice = await this.prices(symbol);
        console.log("symbolPrice:", symbolPrice);
        const maxQuantityToBuy = parseFloat(balanceForAsset.available) / parseFloat(symbolPrice);
        console.log("maxQuantityToBuy:", maxQuantityToBuy);
        const quantityToBuy = maxQuantityToBuy * (quantityPercent / 100.0);
        console.log("quantityToBuy:", quantityToBuy);

        return new Promise((resolve, reject) => {
            binance.marketBuy(symbol, quantityToBuy, (response) => {
                response.msg ? reject(response.msg) : resolve(response);
            });
        });
    };

    this.marketSell = async function(symbol, quantityPercent) {
        const tradingAsset = getTradingAssetFromSymbol(symbol);
        const asset = symbol.substring(0, symbol.lastIndexOf(tradingAsset));
        const balanceForAsset = await getBalanceForAsset(asset);
        console.log("balanceForAsset:", balanceForAsset);
        const maxQuantityToSell = parseFloat(balanceForAsset.available);
        console.log("maxQuantityToSell:", maxQuantityToSell);
        const quantityToSell = maxQuantityToSell * (quantityPercent / 100.0);
        console.log("quantityToSell:", quantityToSell);

        return new Promise((resolve, reject) => {
            binance.marketSell(symbol, quantityToSell, (response) => {
                response.msg ? reject(response.msg) : resolve(response);
            });
        });
    };

    this.allSymbols = async function() {
        const prices = await this.prices();
        return Object.keys(prices);
    };

    function getTradingAssetFromSymbol(symbol) {
        return SupportedTradeAssets.find(asset => {
            return symbol.lastIndexOf(asset) > 0;
        });
    }

    function getBalanceForAsset(asset) {
        return new Promise((resolve, reject) => {
            binance.balance(response => {
                if (response.msg) {
                    reject(response.msg);
                } else {
                    resolve(response[asset]);
                }
            });
        });
    }

}

module.exports = BinanceWrapper;