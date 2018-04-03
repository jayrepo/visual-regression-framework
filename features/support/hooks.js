'use strict'
const {After, Before, BeforeAll} = require('cucumber')
const puppeteer = require('puppeteer')
const devices = require('puppeteer/DeviceDescriptors')
const fs = require('fs-extra')
const deviceName = process.env.EMU
const match = deviceName && deviceName.match(/(\d{3,4})x(\d{3,4})/)
const width = match && +match[1]
const height = match && +match[2]

BeforeAll(async function () {
  await fs.ensureDir('./screenshots/base')
  const files = await fs.readdir('./screenshots')
  await Promise.all(files.filter(file => file.endsWith('.png'))
    .map(file => fs.remove(`./screenshots/${file}`)))
  await fs.ensureDir('./screenshots/diff')
  await fs.emptyDir('./screenshots/diff')
})

Before({timeout: 10 * 1000}, async function () {
  global.browser = await puppeteer.launch({
    executablePath: process.env.CHROME_BIN || 'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
    headless: true
    // args: [
    //   `--window-size=${width},${height}`
    // ]
  })
  global.page = await browser.newPage()
  page.setDefaultNavigationTimeout(60000)
  // device list: https://github.com/GoogleChrome/puppeteer/blob/master/DeviceDescriptors.
  if (deviceName) {
    if (match) {
      await page.setViewport({width, height})
    } else {
      await page.emulate(devices[deviceName])
    }
  }
})

After(async function (result) {
  await browser.close()
})
