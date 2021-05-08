cryptos = [
	{
		name: 'dogecoin',
		ticker: 'doge',
		url: 'https://api.cryptorank.io/v0/coins/dogecoin?locale=en',
		quantity: 0,
	},
	{
		name: 'ethereum',
		ticker: 'eth',
		url: 'https://api.cryptorank.io/v0/coins/ethereum?locale=en',
		quantity: 0,
	},
	{
		name: 'ethereum-classic',
		ticker: 'etc',
		url: 'https://api.cryptorank.io/v0/coins/ethereum-classic?locale=en',
		quantity: 0,
	},
	{
		name: 'bitcoin',
		ticker: 'btc',
		url: 'https://api.cryptorank.io/v0/coins/bitcoin?locale=en',
		quantity: 0,
	},
	{
		name: 'safemoon',
		ticker: 'safe',
		url: 'https://api.cryptorank.io/v0/coins/safemoon/tickers',
		quantity: 0,
	},
	{
		name: 'uniswap',
		ticker: 'uni',
		url: 'https://api.cryptorank.io/v0/coins/uniswap/tickers',
		quantity: 0,
	},
	{
		name: 'binance-coin',
		ticker: 'bnb',
		url: 'https://api.cryptorank.io/v0/coins/binance-coin?locale=en',
		quantity: 0,
	},
	{
		name: 'dollar',
		ticker: 'usd',
		url: 1,
		quantity: 0,
	},
];

let queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);

setQuantity();
updatePage();
setInterval(updatePage, 60000);

async function updatePage() {
	let total = 0;

	for (let i in cryptos) {
		const e = cryptos[i];
		const p = $(`#${e.name}`);
		const price = e.quantity == 0 ? 0 : await getPrice(e.url);
		const value = price * e.quantity;
		total += value;
		p.text(format(value));
	}

	$('#total').text(format(total));

	console.log('updated');
}

function format(number) {
	number = Math.floor(number * 100) / 100;
	number = number.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',');
	number = '$' + number;
	return number;
}

async function getPrice(url) {
	if (!isNaN(url)) return url;
	let data = await axios(url);
	try {
		data = data.data.data.price.USD;
	} catch (error) {
		data = data.data.data;
		let index = data.findIndex((v) => v.exchangeName == 'Pancake Swap');
		index = index < 0 ? 0 : index;
		data = data[index].usdLast;
		console.log(data);
	}
	return data;
}

async function getSafemoon() {
	let data = await axios('https://api.cryptorank.io/v0/coins/safemoon/tickers');
	data = data.data.data;
	let index = data.findIndex((v) => v.exchangeName == 'Pancake Swap');
	index = index < 0 ? 0 : index;
	data = data[index].usdLast;
	return data;
}

function setQuantity() {
	for (let i in cryptos) {
		const val = urlParams.get(cryptos[i].ticker);
		if (val == null || Number(val) == NaN) {
			$(`#${cryptos[i].ticker}`).hide();
		} else {
			cryptos[i].quantity = val;
		}
	}
}
