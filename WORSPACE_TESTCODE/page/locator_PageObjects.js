
//Reference
var EC = protractor.ExpectedConditions;


var locators =  function () {

    locators.prototype.inputText_by_ID = function (ID, Sendkeys) {
        element(by.id(ID)).sendKeys(Sendkeys);
    };

    locators.prototype.clickby_ClassName = function (ClassName) {
        element(by.className(ClassName)).click();
    };

    locators.prototype.clickby_Xpath = function (Xpath) {
        element(by.xpath(Xpath)).click()
    };
    locators.prototype.verify_Is_Present_by_Xpath = function (Xpath,True_False) {
        expect(element(by.xpath(Xpath)).isPresent()).toBe(True_False)
    };
    locators.prototype.verify_Is_Present_by_Xpath_Return = function (Xpath) {
       return element(by.xpath(Xpath)).isPresent().then(function (result) {
            return result;
        })
    };

    locators.prototype.getTextby_ID = function (ID) {
        //read the text and return
        return element(by.id(ID)).getText().then(function (text) {
            return text;
        })
    };
    locators.prototype.getTextby_ClassName = function (Class) {
        return element(by.className(Class)).getText().then(function (text) {
            return text;
        })
    };

    locators.prototype.getTextby_XPath = function (Xpath) {
        return element(by.xpath(Xpath)).getText().then(function (text) {
            return text;
        })
    };
    locators.prototype.verifyElement_Is_Clickable_Xpath = function (Xpath, TimeInSec, FailureMessage) {
        browser.driver.wait(EC.elementToBeClickable(element(by.xpath(Xpath))), TimeInSec,FailureMessage);
    };
    locators.prototype.verifyElement_Is_Clickable_ID = function (ID, TimeInSec, FailureMessage) {
        browser.driver.wait(EC.elementToBeClickable(element(by.id(ID))), TimeInSec,FailureMessage);
    };

};

module.exports = new locators();