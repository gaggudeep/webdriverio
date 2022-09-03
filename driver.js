import webdriverio from 'webdriverio'

const { remote } = webdriverio
export let browser, apiErrors = []

class Driver {

    async getDriver() {
        return browser = await remote({
            capabilities: {
                browserName: 'chrome',
            }
        })
    }

    async attachResponseListener() {
        const pup = await browser.getPuppeteer()
        const page = (await pup.pages())[0]
        page.on('response', async resp => {
            let url = await resp.url()
            let status = await resp.status()

            if (url.includes('ms-gateway')) {
                if (status != 200)
                    apiErrors.push(new Error(`Error: Status: ${status} on ${url}`))
            }
        })
    }
}

export default new Driver()