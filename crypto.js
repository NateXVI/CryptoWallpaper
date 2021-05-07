const dogecoin = 18638;
const ethereumClassic = 60.0148;
const safemoon = 168000000;

updatePage();
setInterval(updatePage, 60000);

async function updatePage() {
	const page = {
		doge: $('#dogecoin'),
		etc: $('#ethereum-classic'),
		safe: $('#safemoon'),
		total: $('#total'),
	};
	const d = (await getDoge()) * dogecoin;
	const e = (await getEthereumClassic()) * ethereumClassic;
	const s = (await getSafemoon()) * safemoon;
	page.doge.text(format(d));
	page.etc.text(format(e));
	page.safe.text(format(s));
	page.total.text(format(d + e + s));

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
// url: 'https://api.cryptorank.io/v0/token/ethereum-classic?locale=en',
async function getEthereumClassic() {
	let data = await axios({
		url: 'https://api.cryptorank.io/v0/coins/ethereum-classic?locale=en',
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
