const puppeteer = require('puppeteer');
const { readFileSync, writeFileSync, readdirSync } = require("fs");
const sites = readdirSync('./datas').filter(file => file.endsWith('.png'));

    
sites.forEach(async (file) => {
    const url = `https://${file.slice(0, -4).split("@").join("/")}`;
    try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setUserAgent("Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.0 Safari/537.36");
    await page.goto(`${url}`, {waitUntil: 'networkidle0'});
    if(file.startsWith("google.com")) await page.click("a").catch(err=>{});
    setTimeout(async () => {
    await page.screenshot({path: `./datas/${file}`, fullPage: true});
    await browser.close();
    console.log(`Done ${url}`);
    }, 10000);
    }catch(e) {
        console.log(e)
    console.log(`Failed ${url}`);
    }
})
    


