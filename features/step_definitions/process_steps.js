'use strict'
const { Given, Then } = require('cucumber')
const { getDiff } = require('../support/$u')
const fs = require('fs-extra')

Given('I go to {string}', {timeout: 60 * 1000}, async function (url) {
  await page.goto(url, {waitUntil: 'networkidle0'})
})

Given('I make some changes', async function () {
  await page.$$eval('.btn-outline-primary',
    btns => btns.map(b => { b.style.paddingLeft = '50px' }))
})

Then('I take screenshot of the page as {string}', async function (fileName) {
  const name = fileName +
    (process.env.EMU ? '.' + process.env.EMU.replace(/ /g, '_') : '')
  const baseImage = `screenshots/base/${name}.png`
  const newImage = `screenshots/${name}.png`
  await page.screenshot({path: newImage, fullPage: true})
  const diff = await getDiff(baseImage, newImage)
  // console.dir(diff)
  if (diff && diff.rawMisMatchPercentage) {
    await fs.outputFile(`screenshots/diff/${name}.diff.png`, diff.getBuffer())
  }
})
