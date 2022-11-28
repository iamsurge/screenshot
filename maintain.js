const puppeteer = require('puppeteer');
const { readFileSync, writeFileSync, readdirSync } = require("fs");
const sites = readdirSync('./datas').filter(file => file.endsWith('.png'));

    
sites.forEach(async (file) => {
    const url = `https://${file.slice(0, -4).split("@").join("/")}`;
    try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(`${url}`, {waitUntil: 'networkidle0'});
    const links = await page.$("a");
    if(links && url.includes("google.com")) { await links.click(); }
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
    


