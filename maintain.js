const puppeteer = require('puppeteer');
const { readFileSync, writeFileSync, readdirSync } = require("fs");
const sites = readdirSync('./datas').filter(file => file.endsWith('.png'));

    
sites.forEach(async (file) => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(`https://${file.slice(0, -4).split("@").join("/")}`, {waitUntil: 'networkidle0'});
    await page.waitFor(15000);
    await page.screenshot({path: `./datas/${file}`, fullPage: true});
    await browser.close();
})
    


