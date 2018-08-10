/**
 * Created by kesavara on 30-06-2017.
 */


//var navMenuPage = require('');
var HomePage = function() {

    HomePage.prototype.AmazonSite_Home = function () {
        browser.driver.get('https://www.amazon.com/');
    };
};

module.exports = new HomePage();
