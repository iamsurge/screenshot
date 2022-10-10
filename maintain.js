const puppeteer = require('puppeteer');
const { readFileSync, writeFileSync, readdirSync } = require("fs");
const sites = readdirSync('./datas').filter(file => file.endsWith('.png'));

async function browser() {
    const browser = await puppeteer.launch();
    
 sites.forEach(async (file) => {
    const page = await browser.newPage();
    await page.goto(`https://${file.slice(4)}`, {waitUntil: 'networkidle0'});
    await page.screenshot({path: `./datas/${file}`, fullPage: true});
  })
    await browser.close();
}

browser();
