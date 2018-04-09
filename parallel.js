const childProcess = require('child_process')

if (process.env.EMU) {
  const devices = process.env.EMU.split(',').map(device => device.trim())
  for (const device of devices) {
    const env = Object.create(process.env)
    env.EMU = device
    const p = childProcess.spawn('node', ['./node_modules/cucumber/bin/cucumber-js'], {env: env})
    p.stdout.on('data', (data) => {
      console.log(`[${device}]: ${data}`)
    })
    // p.stdout.pipe(process.stdout)
  }
}
