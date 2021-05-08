let url = 'https://natexvi.github.io/CryptoWallpaper/'

let tickers = ['doge', 'eth', 'etc', 'btc', 'safe', 'uni', 'bnb', 'usd'];

let textInputs = [];

let parentContainer = $('#inputs');

for (let i in tickers) {
    const t = tickers[i];
    parentContainer.append(`<div class="input-container" id="${t}-container"></div>`);
    const container = $(`#${t}-container`);
    
    container.append(` <h3>${t.toUpperCase()}:</h3> `);
    container.append(`<input type="number" id="${t}"></input>`);
    const input = $(`#${t}`);
    input.change((event) => saveTicker(event))
    const val = localStorage.getItem(t);
    if (val) {
        input.val(val);
    }

}

function saveTicker(event) {
    ticker = event.target.id;
    val = $(`#${ticker}`).val();
    localStorage.setItem(ticker, val);
}

function go() {
    let newUrl = url + '?'

    for (let i in tickers) {
        const t = tickers[i];
        const val = $(`#${t}`).val();

        if (val != ''){
            newUrl += t +'=';
            newUrl += val
            
            newUrl += '&';
        }
    }

    window.location = newUrl
}