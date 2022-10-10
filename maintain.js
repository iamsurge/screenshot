const puppeteer = require('puppeteer');
const { readFileSync, writeFileSync } = require("fs")

async function browser(url) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.goto(url, {waitUntil: 'networkidle0'});
    await page.waitFor(10000);
    writeFileSync("./output.txt", await page.content());
    await page.screenshot({path: './screenshot.png', fullPage: true});
    await browser.close();
}

browser("https://joelee.works/");
