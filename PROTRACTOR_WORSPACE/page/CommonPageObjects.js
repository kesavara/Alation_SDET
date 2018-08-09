/**
 * Created by kesavara on 09-08-2018.
 */



var Table;
var TableRow;
var TableCells;

function CommonPageObjects() {};



//this._Next = element(by.css('input.primaryButton'));
    //browser.driver.findElement(by.css('input.primaryButton'));

    CommonPageObjects.prototype.waitForTitle = function (title) {
        var Wait1 = protractor.ExpectedConditions;
        browser.driver.wait(Wait1.titleContains(title), 20000, 'Pls Check the title');
    };

    CommonPageObjects.prototype.waitforAngular= function (True_False) {
        browser.waitForAngularEnabled(True_False);
    };




module.exports = new CommonPageObjects();