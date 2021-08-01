const webdriver = require('../../packages/webdriverio/build/index')
// eslint-disable-next-line no-unexpected-multiline
(async () => {
    const config = { drivers: { firefox: '0.29.1', chrome: true, chromiumedge: 'latest' }, args: { seleniumArgs: ['-port', '7777'] } }
    const capabilitiesConfig = {
        browserName: 'chrome',
    }
    const wdioArgs = {
        logLevel: 'trace',
        hostname: 'localhost',
        port: 7777,
        path: '/wd/hub', // remove `path` if you decided using something different from driver binaries.
        capabilities: capabilitiesConfig,
        services: [
            ['selenium-standalone', config]
        ]
    }
    // // merge default config
    // const seleniumStandaloneLauncher = new seleniumStandalone.launcher(
    //     config,
    //     [{
    //         ...capabilitiesConfig
    //     }],
    //     {
    //     }
    // )
    // await seleniumStandaloneLauncher.onPrepare({
    //     browserName: 'chrome',
    // })
    const browser = await webdriver.remote({ ...wdioArgs })

    await browser.url('https://webdriver.io')
    if ((await browser.getTitle()).indexOf('WebdriverIO') === -1) {
        throw new Error('upps something went wrong')
    }
    await browser.deleteSession()
})()
