// Another Spec

var homePage = require('../page/homePages');
var CommonObject = require('../page/CommonPageObjects');
var locators_Objects = require('../page/locator_PageObjects')

describe('Kindle Buy TestCases : Alation-SDET Assignment',function(){
    beforeEach(function () {
        isAngularSite(false);
        CommonObject.waitforAngular(false);
    });
    afterAll(function(){
        browser.close();
    });

        describe('Kindle Book Buy - Testcases',function(){
            
            it("TestCase 1 : GoTO Amazon.com",function(){
                homePage.AmazonSite_Home();
                CommonObject.assert_title("Amazon.com: Online Shopping for Electronics, Apparel, Computers, Books, DVDs & more");
            });

            it("TestCase 2 : Choose Books Department",function(){
                CommonObject.waitforAngular(false);
                var select = element(by.id ("searchDropdownBox"));
                select.element(by.cssContainingText("option", "Books")).click();

                locators_Objects.inputText_by_ID("twotabsearchtextbox","data catalog");
                locators_Objects.clickby_ClassName("nav-search-submit nav-sprite");
                locators_Objects.clickby_Xpath('//*[@id="result_0"]//a/img');

            });

            it("TestCase 3 : Read the Book Title",function () {
                locators_Objects.getTextby_ID("productTitle").then(function (text) {
                    console.log("Selected Book Name is "+ text);
                    //  });
                })

            });

        });
        describe(" TestCases Related to 'KINDLE BUY Book",function(){
            
            it("TestCase 4 : Switch to Kindle Tab and read the Price of Kindle",function(){
                locators_Objects.clickby_Xpath("//*[@id='mediaTab_heading_0']//*[contains(text(),'Kindle')]");
                element(by.className("a-size-medium a-color-price header-price")).getText().then(function (getText_Price) {
                        console.log("Price of Kindle is " + getText_Price);
                });

            });
            it("TestCase 5 : Verify the page results in Kindle Edition ",function () {

                locators_Objects.getTextby_XPath("//*[@id='title']/span[3]").then(function (text) {
                    var  Edition = text;
                    expect(Edition).toContain('Kindle Edition');
                });

            });
            it("TestCase 6 : Verify Buy Now, Send a Free Sample , Give as Gift ",function(){
                locators_Objects.verifyElement_Is_Clickable_Xpath(".//form[@id='buyOneClick']//*[contains(text(),'Buy now')]",5000,"Buy now is Enabled for Selection");
                locators_Objects.verifyElement_Is_Clickable_Xpath("//form[@id='buyOneClick']//*[contains(text(),'Send a free sample')]",5000,"Send a Free Sample is Enabled for Selection");
                locators_Objects.verifyElement_Is_Clickable_ID("gift-button-announce",5000,"Give as Gift option is not available");

            });
            it("TestCase 7 : Read the eBooK features and print them  \n" +
                "EXPECTED Result : Smaple 0 'Highlight, take notes, and search in the book'\n" +
                "1 'page numbers are just like the physical edition'\n" +
                "2 'Length: 274 pages' etc .... ", function(){
                // Read the text from the table. get thetext from the each row and print to console
                var FeatureAll = element.all(by.id('eTextbookBulletList'));
                var tagnameAll = FeatureAll.all(by.tagName("li"));
                var spanAll = tagnameAll.all(by.tagName('span')).each(function (element, index) {
                    // Will print 0 First, 1 Second, 2 Third.
                    element.getText().then(function (text) {
                        console.log(index, text);
                    });
                });


            });
            it("TestCase 9 :Read 'Available on these devices' and list them .\n" +
                "EXPECTED RESULT - 0 'Kindle Fire HDX'\n" +
                "1 'Kindle for iPad'\n" +
                "2 'Kindle for iPhone' ",function(){
                var FeatureAll = element.all(by.className('a-unordered-list a-vertical a-spacing-none'));
                 var tagnameAll = FeatureAll.all(by.tagName("li"));
                  var spanAll = tagnameAll.all(by.tagName('span'));
                    var anchorlinkAll = spanAll.all(by.tagName('a')) .each(function(element, index) {
                    // Will print 0 First, 1 Second, 2 Third.
                    element.getText().then(function (text) {
                        console.log(index, text);
                    });
                });
            });
            it("TestCase 10 : Read the Sold By . If exists, print the name of vendor ",function () {
                var SoldBy = expect(element(by.xpath(".//*[@id='mediaNoAccordion']//*[contains(text(),'Sold by:')]")).isDisplayed()).toBe(true);
                if(SoldBy) {
                    locators_Objects.getTextby_XPath("//*[@id='mediaNoAccordion']//div[3]/span[2]").then(function (vendorName) {
                        console.log("Sold By  " + vendorName);
                    });
                }else{
                    console.log("Sold By Option is not available....")

                }
            });
            it("TestCase 11 : Verify 'ADD TO CART' navigates to AddedToCart_Page",function () {
                locators_Objects.clickby_Xpath("//input[@id='checkout-button']");
                expect(browser.getTitle()).toContain('Amazon Sign In');
                browser.navigate().back();
            });


        });
            
               
                
    



})