const compareImages = require('resemblejs/compareImages')
const fs = require('fs-extra')

async function getDiff (baseImage, newImage) {
  const options = {
    output: {
      errorColor: {
        red: 255,
        green: 0,
        blue: 255
      },
      errorType: 'movement',
      transparency: 0.3,
      largeImageThreshold: 1200,
      useCrossOrigin: false,
      outputDiff: true
    },
    scaleToSameSize: true,
    ignore: ['nothing', 'less', 'antialiasing', 'colors', 'alpha']
  }

  // The parameters can be Node Buffers
  // data is the same as usual with an additional getBuffer() function
  if (!await fs.exists(baseImage)) {
    await fs.copyFile(newImage, baseImage)
    return null
  }

  const data = await compareImages(
      await fs.readFile(baseImage),
      await fs.readFile(newImage),
      options
  )
  return data
}

module.exports = {
  getDiff: getDiff
}
