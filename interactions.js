import constants from './constants.js'
import { browser } from './driver.js'

class Interactions {

    FIELD_TO_TEXT_DICT = {
        origin: 'From',
        destination: 'To',
    }

    async input(field, value) {
        let fieldText = this.FIELD_TO_TEXT_DICT[field]
        let fieldXpath = this.fillText(
            constants.SEARCH_INPUT_XPATH_TEMPLATE,
            fieldText)
        let searchResultXpath = this.fillText(
            constants.DIV_XPATH_TEMPLATE,
            value)

        let fieldEle = await this.findElementByXpath(fieldXpath)
        await fieldEle.waitForClickable()
        await fieldEle.setValue(value)

        let searchResEle = await this.findElementByXpath(searchResultXpath)
        await searchResEle.waitForDisplayed()
        await searchResEle.click()
    }

    async selectDepartureDate() {
        let departureDateEle = await this.findElementByXpath(
            constants.CALENDAR_DATE_XPATH)
        await departureDateEle.waitForDisplayed()
        await departureDateEle.click()
    }

    async submit(text) {
        let submitXpath = this.fillText(constants.BUTTON_XPATH_TEMPLATE, text)
        let submitEle = await this.findElementByXpath(submitXpath)
        await submitEle.waitForClickable()
        await submitEle.click()
    }

    async confirmInfoAlert() {
        let infoXpath = this.fillText(constants.DIV_XPATH_TEMPLATE, 'Got It')
        let infoEle = await this.findElementByXpath(infoXpath)
        await infoEle.waitForClickable()
        await infoEle.click()
    }

    async selectFlight(airline) {
        let flightXpath = this.fillText(constants.FLIGHT_XPATH_TEMPLATE, airline)
        let flightEle = await this.findElementByXpath(flightXpath)
        await flightEle.waitForDisplayed()
        await flightEle.click()
    }

    async fillBookingDetails() {
        let titleXpath = this.fillText(constants.DROPDOWN_INPUT_XPATH_TEMPLATE, 'Title')
        let titleOptionXpath = this.fillText(constants.DIV_XPATH_TEMPLATE, 'Mr.')
        let nameXpath = this.fillText(constants.FORM_INPUT_XPATH_TEMPLATE, 'Full Name')
        let emailXpath = this.fillText(constants.FORM_INPUT_XPATH_TEMPLATE, 'Email Address')
        let mobileXpath = this.fillText(constants.FORM_INPUT_XPATH_TEMPLATE, 'Phone')
        let passportXpath = this.fillText(constants.FORM_INPUT_XPATH_TEMPLATE, 'NIK/Passport No.')
        let nationalityXpath = this.fillText(constants.DROPDOWN_INPUT_XPATH_TEMPLATE, 'Nationality')

        let titleEle = await this.findElementByXpath(titleXpath)
        await titleEle.waitForClickable({ timeout: 10000 })
        let nameEle = await this.findElementByXpath(nameXpath)
        let emailEle = await this.findElementByXpath(emailXpath)
        let mobileEle = await this.findElementByXpath(mobileXpath)
        let sameAsContactPersonToggle = await this.findElementByXpath(constants.SAME_AS_CONTACT_TOGGLE)
        let passportEleExists = await this.findIfElementExistByXpath(passportXpath)
        let nationalityEleExists = await this.findIfElementExistByXpath(nationalityXpath)
        let dobEleExists = await this.findIfElementExistByXpath(constants.DOB_XPATH)

        await titleEle.click()
        let titleOptionEle = await this.findElementByXpath(titleOptionXpath)
        await titleOptionEle.click()
        await nameEle.setValue('test')
        await emailEle.setValue('test@tiket.com')
        await mobileEle.setValue('6025552555')
        await sameAsContactPersonToggle.click()

        if (nationalityEleExists) {
            let nationalityOptionXpath = this.fillText(constants.DIV_XPATH_TEMPLATE, 'Indonesia')
            let nationalityEle = await this.findElementByXpath(nationalityXpath)
            let nationalityOptionEle = await this.findElementByXpath(nationalityOptionXpath)
            await nationalityEle.click()
            await nationalityOptionEle.click()
        }
        if (passportEleExists) {
            let passportEle = await this.findElementByXpath(passportXpath)
            await passportEle.setValue('abcdef')
        }

        if (!dobEleExists)
            return

        let dobEle = await this.findElementByXpath(constants.DOB_XPATH)
        await dobEle.click()
        let dobDayEle = await this.findElementByXpath(constants.DOB_DAY_XPATH)
        let dobMonthEle = await this.findElementByXpath(constants.DOB_MONTH_XPATH)
        let dobYearEle = await this.findElementByXpath(constants.DOB_YEAR_XPATH)
        await dobDayEle.click()
        await dobMonthEle.click()
        await dobYearEle.click()
    }

    fillText(xpath, text) {
        return xpath.replace(constants.TEXT_PLACEHOLDER, text)
    }

    async findElementByXpath(xpath) {
        let ele = await browser.$(xpath)
        return ele
    }

    async findElementsByXpath(xpath) {
        return await browser.$$(xpath)
    }

    async findIfElementExistByXpath(xpath) {
        return await browser.$(xpath).isExisting()
    }

    async sleep(ms) {
        return new Promise((resolve => setTimeout(resolve, ms)))
    }
}

export default new Interactions()