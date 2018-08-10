/**
 * Created by kesavara on 09-08-2018.
 */



var Table;
var TableRow;
var TableCells;

function CommonPageObjects() {};




    CommonPageObjects.prototype.waitForTitle = function (title) {
        //wait for the title to result in DOM, here it waits for 20 sec, On failure finding the title, Error Message(Pls CHeck the title) will be displayed)
        var Wait1 = protractor.ExpectedConditions;
        browser.driver.wait(Wait1.titleContains(title), 20000, 'Pls Check the title');
    };

    CommonPageObjects.prototype.waitforAngular= function (True_False) {
        browser.waitForAngularEnabled(True_False);
    };
    CommonPageObjects.prototype.assert_title = function (title) {
        //Jasmie Assert to get browser title
        expect(browser.getTitle()).toContain(title);
    };




module.exports = new CommonPageObjects();