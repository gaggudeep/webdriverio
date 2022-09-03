const constants = {
    BASE_URL: 'https://en.tiket.com',
    get FLIGHT_URL() {
        return `${this.BASE_URL}/pesawat`
    },
    TEXT_PLACEHOLDER: '$',
    get SEARCH_INPUT_XPATH_TEMPLATE() {
        return `//label[contains(text(), '${this.TEXT_PLACEHOLDER}')]//following::div[1]//child::input`
    },
    get DIV_XPATH_TEMPLATE() {
        return `//div[contains(text(), '${this.TEXT_PLACEHOLDER}')]`
    },
    get BUTTON_XPATH_TEMPLATE() {
        return `//button[contains(text(), '${this.TEXT_PLACEHOLDER}')]`
    },
    get FLIGHT_XPATH_TEMPLATE() {
        return `//span[contains(text(), '${this.TEXT_PLACEHOLDER}')]//preceding::div[contains(text(), 'SELECT')]`
    },
    get FORM_INPUT_XPATH_TEMPLATE() {
        return `//div[contains(text(), '${this.TEXT_PLACEHOLDER}')]//preceding-sibling::input`
    },
    get DROPDOWN_INPUT_XPATH_TEMPLATE() {
        return `//div[contains(text(), '${this.TEXT_PLACEHOLDER}')]//following-sibling::input`
    },
    CALENDAR_DATE_XPATH: `//td[contains(@aria-label, 'start')]//following::td[contains(@aria-label, 'available')][7]`,
    SEARCH_PROGRESS_XPATH: `//div[contains(@class, 'loading-line-bar')]`,
    DOB_XPATH: `//label[contains(text(), 'Date of Birth')]//following::input[1]`,
    DOB_DAY_XPATH: `(//li/div[contains(text(), '1')])[1]`,
    DOB_MONTH_XPATH: `(//li/div[contains(text(), 'Jan')])[1]`,
    DOB_YEAR_XPATH: `(//li/div[contains(text(), '1995')])[1]`,
    SAME_AS_CONTACT_TOGGLE: '//span[contains(text(), \'Same as contact person\')]//following-sibling::input'
}

export default constants