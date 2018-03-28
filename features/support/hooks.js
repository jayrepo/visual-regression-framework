'use strict'
const {After, Before} = require('cucumber')
const puppeteer = require('puppeteer')
const devices = require('puppeteer/DeviceDescriptors')
const deviceName = process.env.EMU
const match = deviceName && deviceName.match(/(\d{3,4})x(\d{3,4})/)
const width = match && +match[1]
const height = match && +match[2]

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
