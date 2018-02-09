const puppeteer = require('puppeteer');

(async () => {
    let gameName = '荒野行动';

    const browser = await puppeteer.launch({headless:true});
    const page = await browser.newPage();

    await page.goto ('http://www.sapprft.gov.cn/sapprft/zongshu/serviceList2.shtml?FileName=' + gameName);
    await page.waitFor(3000);

    for (i=2;i<10;i++) {
        let name_tdsel = '#ajaxElement_1_702 > table > tbody > tr:nth-child(' + i + ') > td:nth-child(1) > a';
        const name = await page.$eval(name_tdsel, a => a.innerText);

        if (name == gameName) {
            console.log(name + "有版号！");
            break;
        }
        else{
            continue;
        }
    }
    browser.close();
})();
