const puppeteer = require('puppeteer');

// function queryAll(arr){  
//     return arr.map(
//         data => xxx(data)
//     )}

const query = async (gameName) => {
	
	const browser = await puppeteer.launch({headless: true});
	const page = await browser.newPage();

	await page.goto('http://www.sapprft.gov.cn/sapprft/zongshu/serviceList2.shtml?FileName=' + gameName);
	// await page.waitFor(3000);

	try {
		for (i = 2; i < 10; i++) {
			let name_tdsel = '#ajaxElement_1_265 > table > tbody > tr:nth-child(' + i + ') > td:nth-child(1) > a';
			let pubCom_tdsel = '#ajaxElement_1_265 > table > tbody > tr:nth-child(' + i + ') > td:nth-child(2)';
			let optCom_tdsel = '#ajaxElement_1_265 > table > tbody > tr:nth-child(' + i + ') > td:nth-child(3)';
			let pubNum_tdsel = '#ajaxElement_1_265 > table > tbody > tr:nth-child(' + i + ') > td:nth-child(4)';
			const name = await page.$eval(name_tdsel, a => a.innerText);
			const pubCom = await page.$eval(pubCom_tdsel, a => a.innerText);
			const optCom = await page.$eval(optCom_tdsel, a => a.innerText);
			const pubNum = await page.$eval(pubNum_tdsel, a => a.innerText);

			if (name == gameName) {
				console.log(name + "  " + pubNum);
				// console.log(name + "  " + pubCom + "  " + optCom + "  " + pubNum);
				break;
			} else {
				continue;
			}
		}
	} catch (e) {
		console.log(gameName + "  找不到版号。");
	}
	browser.close();
}


let arr=[
	'梦幻西游',
	'荒野行动'
];


let j=0;
while (j<arr.length) {
	const gameList = arr[j];
	query(gameList);
	j++;
}
