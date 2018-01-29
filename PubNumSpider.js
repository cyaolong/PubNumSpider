const puppeteer = require('puppeteer');

let timeout = function (delay) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            try {
                resolve(1)
            } catch (e) {
                reject(0)
            }
        }, delay);
    })
};

(async () => {
    let pages=4;
    while(pages<6){
        await run(pages);
        pages++;
    }
})();

async function run(pages) {
    const browser = await puppeteer.launch({headless:false});
    const page = await browser.newPage();

    if (pages==1){
        await page.goto ('http://www.sapprft.gov.cn/sapprft/channels/7029.shtml');
        await page.waitFor(2000);
    }
    else {
        await page.goto ('http://www.sapprft.gov.cn/sapprft/channels/7029_' + pages + '.shtml');
        await page.waitFor(2000);
    }

    try {
        let i=1;
        while (i<2){
            const pageHref = await page.$eval('body > div.jar_main2 > div.jar2mBox > div.jar2L > div.jar2l_list > ul > li:nth-child(' + i + ') > a', a => a.href);
            const pageTitle = await page.$eval('body > div.jar_main2 > div.jar2mBox > div.jar2L > div.jar2l_list > ul > li:nth-child(' + i + ') > a', a => a.innerText);
            console.log(i + '  第' + pages + '页,  ' + pageTitle + '  '+ pageHref);
            i++;

            await page.goto(pageHref);
            await timeout(1000 + Math.random()*100);
        }
    } catch (e) {
        console.log("已完成！");
    }
    browser.close();
}
