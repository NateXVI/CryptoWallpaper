
let dogecoin = 1;
let ethereum = 1;
let ethereumClassic = 1;
let safemoon = 1;

let queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);



updatePage();
setInterval(updatePage, 60000);

async function updatePage() {
	const page = {
		doge: $('#dogecoin'),
		eth: $('#ethereum'),
		etc: $('#ethereum-classic'),
		safe: $('#safemoon'),
		total: $('#total'),
	};
	const d = dogecoin == 0 ? 0 : (await getDoge()) * dogecoin;
	const e = ethereum == 0 ? 0: (await getEthereum()) * ethereum;
	const ec = ethereumClassic == 0 ? 0: (await getEthereumClassic()) * ethereumClassic;
	const s = safemoon == 0 ? 0 : (await getSafemoon()) * safemoon;
	page.doge.text(format(d));
	page.eth.text(format(e));
	page.etc.text(format(ec));
	page.safe.text(format(s));
	page.total.text(format(d + e + ec + s));

	console.log('updated');
}

function format(number) {
	number = Math.floor(number * 100) / 100;
	number = number.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',');
	number = '$' + number;
	return number;
}

async function getDoge() {
	let data = await axios({
		url: 'https://api.cryptorank.io/v0/coins/dogecoin?locale=en',
	});
	data = data.data.data.price.USD;
	return data;
}

async function getEthereumClassic() {
	let data = await axios({
		url: 'https://api.cryptorank.io/v0/coins/ethereum-classic?locale=en',
	});
	data = data.data.data.price.USD;
	return data;
}

async function getEthereum() {
	let data = await axios({
		url: 'https://api.cryptorank.io/v0/coins/ethereum?locale=en',
	});
	data = data.data.data.price.USD;
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

function setQuantity(s) {
	let q = urlParams.get(s);
	console.log(q);
	if (q == null || Number(q) == NaN) {
		console.log(`${s} hidden`)
		$(`#${s}`).hide();
		return 0;
	}
	console.log(Number(q))
	if (Number(q) == NaN) return 1;

	return q
}

dogecoin = setQuantity('d');
ethereum = setQuantity('e');
ethereumClassic = setQuantity('ec');
safemoon = setQuantity('s');