import constants from './constants.js'
import driver from './driver.js'
import interactions from './interactions.js'
import { apiErrors } from './driver.js'

(async () => {
    const browser = await driver.getDriver()
    await driver.attachResponseListener()

    await browser.url(constants.FLIGHT_URL)

    await interactions.input('origin', 'CGK')
    await interactions.input('destination', 'DPS')
    await interactions.selectDepartureDate()
    await interactions.submit('DONE')
    await interactions.submit('SEARCH FLIGHTS')
    await interactions.confirmInfoAlert()
    await interactions.selectFlight('Lion Air')
    await interactions.fillBookingDetails()
    await interactions.submit('CONTINUE TO PAYMENT')
    await interactions.submit('YES, CONTINUE')

    await browser.deleteSession()

    console.log('API errors:-')
    apiErrors.forEach(res => console.log(res))
})()