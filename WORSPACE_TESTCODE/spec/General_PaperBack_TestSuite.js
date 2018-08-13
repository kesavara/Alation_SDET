
// Using Protarctor - selenium Framework, JAVASCRIPT , Protractor API's


//References
var homePage = require('../page/homePages');
var CommonObject = require('../page/CommonPageObjects');
var locators_Objects = require('../page/locator_PageObjects');
var EC = protractor.ExpectedConditions;

var objects_storage = {
    Vendors_Choice : null,
    Price_StartWith : null
};

//describe - Test Suite . Has 2 paramaeters (srting and  fucntion). String is title and function is the actual test

describe('Alation-SDET Assignment',function(){
    //Annotation like junit or testng. Jasmine framework provides good setup and teardown annotations
    beforeEach(function () {
        // as Amazon.com FrontEnd Development did not use Angular framework elements. We are telling protarctor not to look /wait for angular.
        isAngularSite(false);
        CommonObject.waitforAngular(false);
    });
    afterAll(function(){
        // After all close the browser and restart for next SPEC
        browser.close();
        browser.restart();
    });
        //we can have mutliple test suites under each Test suite
        describe('Amazon.com is used for SDET Assignment - General TestCases',function(){
          //it - the actutal test cases.
            it("TestCase 1 : GoTO Amazon.com",function(){
                homePage.AmazonSite_Home();
                // JASMINE framework Assert functions
                CommonObject.assert_title("Amazon.com: Online Shopping for Electronics, Apparel, Computers, Books, DVDs & more");
                //expect(browser.getTitle()).toContain("Amazon.com: Online Shopping for Electronics, Apparel, Computers, Books, DVDs & more");

            });

            it("TestCase 2 : Choose Books Department",function(){
                //Select the option from the dropdown
                var select = element(by.id ("searchDropdownBox"))
                select.element(by.cssContainingText("option", "Books")).click();
                // sendkeys to the SearchBox
                locators_Objects.inputText_by_ID("twotabsearchtextbox","data catalog");
                locators_Objects.clickby_ClassName("nav-search-submit nav-sprite");
                locators_Objects.clickby_Xpath('//*[@id="result_0"]//a/img');

            });

            it("TestCase 3 : Read the Book Title",function () {
                //get the the title text and then print the returned text
                locators_Objects.getTextby_ID("productTitle").then(function (getText) {
                    console.log("Selected Book Name is "+ getText);
                });
            });
            it("TestCase 4 : Read the Authors Name ,Book Written By. List their Names",function() {
                var Authors_All = element(by.id("bylineInfo"))
                Authors_All.all(by.tagName("a")).getText().then(function (AuthorNames) {
                    // Output string to look in better way,eleminating unwanted commas
                    var AuthorString = AuthorNames + '';
                    var AuthorName_list = AuthorString.split(',,,,,')
                    console.log("Book Written By Authors : " + AuthorName_list);
                });
            });

            it("TestCase 5 : Read the Price RANGES (PaperBack,Kindle) of NewBook", function () {
                //read the text and display it
                locators_Objects.getTextby_XPath('//li[@id="mediaTab_heading_1"]/a/span/div[2]/span').then(function(PaperBackPrice){
                    console.log("paperBack Price is "+ PaperBackPrice)
                });
                locators_Objects.getTextby_XPath('//li[@id="mediaTab_heading_0"]/a/span/div[2]/span').then(function(KindlePrice) {
                    console.log("Kindle Price is " + KindlePrice)
                });

            });
            it("TestCase 6 : Read the Book ISBN-13 and ISBN-10 Bar Code Values",function () {
                //Asserting whether element is present or not
                locators_Objects.verify_Is_Present_by_Xpath_Return("//*[@id='isbn_feature_div']").then(function(result) {
                    if(result == true){
                        ISBN_Version = locators_Objects.getTextby_XPath("//*[@id='isbn_feature_div']/div/div[1]/span[1]").then(function (ISBN_Number) {
                            return ISBN_Number;
                        });
                        ISBN_Number= locators_Objects.getTextby_XPath("//*[@id='isbn_feature_div']/div/div[1]/span[2]").then(function (ReadValue) {
                            return ReadValue;
                        });
                        console.log("ISBN Version is "+ ISBN_Version +"= "+ " ISBN CODE IS" + ISBN_Number);
                    }
                    else{
                        console.log("ISBN Numbers are not displayed")
                    }
                })

            });
            
            it("TestCase 7 : Read the Product Details and display it at the console", function () {
                var ProductDetails = element.all(by.id('productDetailsTable'));
                var tagnameAll = ProductDetails.all(by.tagName("li"));
                var spanAll = tagnameAll.all(by.tagName('b')).each(function (element, index) {
                    // Will print 0 First, 1 Second, 2 Third.
                    element.getText().then(function (text) {
                        console.log(index, text);
                    });
                });
                var detailsAll = ProductDetails.all(by.tagName('li')).each(function (element, index) {
                    // Will print 0 First, 1 Second, 2 Third.
                    element.getText().then(function (text) {
                        console.log(index, text);
                    });
                });
            });

            it("TestCase 8 : Read the Description about the product, display few lines about the product",function () {
                var iframe = browser.driver.findElement(by.css('iframe[id="bookDesc_iframe"]'));
                browser.driver.switchTo().frame(iframe);
                locators_Objects.getTextby_XPath("//div[@id='iframeContent']/p").then(function (result) {
                    console.log("description is -----"+result);
                });
                browser.driver.switchTo().defaultContent();
            })





        });
        describe(" TestCases Related to 'PAPER BACK' Book",function(){
            
            it("TestCase 9 : Buy New Book Price of PaperBack",function(){
                locators_Objects.clickby_Xpath("//div[@id='newOfferAccordionRow']/div/div/a/i");
                locators_Objects.getTextby_ClassName("a-size-medium a-color-price header-price").then(function (getText_Price) {
                        console.log("Price of NewBook is " + getText_Price);
                });

            });
            it("TestCase 10 : Verify 'ADD TO CART' navigates to AddedToCart_Page",function () {
                locators_Objects.clickby_Xpath("//input[@id='add-to-cart-button']");
                //Assert the page title
                expect(browser.getTitle()).toContain('Amazon.com Shopping Cart');
                browser.navigate().back();
            });

            it("TestCase 11 : Verify New Book is 'IN STOCK' or Not ",function(){
                var Output=locators_Objects.getTextby_ClassName("a-size-medium a-color-success").then(function (result) {
                    expect(result).toEqual("In Stock.");
                    return result;
                });
                if(Output == "In Stock."){
                    console.log("New Book is IN STOCK")
                } else{
                    console.log("New Book is OUT OF STOCK")
                }
            });

            it("TestCase 12 : Product Delivery COuntry and expected date",function(){
                locators_Objects.getTextby_XPath('//*[@id="delivery-message"][1]/b[1]').then(function(country){
                    console.log("Delivery COuntry is : "+ country);   
                });
                locators_Objects.getTextby_XPath('//*[@id="delivery-message"][1]/b[2]').then(function(Date){
                    console.log("Delivery Date Expected is : "+ Date);   
                });

            });
            it("TestCase 13 : Verify 'Add to Card','Buy Now','Quantity' and 'See All Buying Options' is Present and Enabled for Selection",function(){

                locators_Objects.verifyElement_Is_Clickable_Xpath("//*[@id='add-to-cart-button']",5000,"On Faliure if not clickable,this message will be displayed at output. \n 'Add to Cart is not Enabled for selection'");
                locators_Objects.verifyElement_Is_Clickable_Xpath("//*[@id='bbopAndCartBox']//*[@id='buyNow']",5000,"Buy Now is not Enabled for selection");
                locators_Objects.verifyElement_Is_Clickable_Xpath(".//*[@id='a-autoid-1-announce']/span[1]",5000,"Quantity is not Enabled");
                locators_Objects.verifyElement_Is_Clickable_ID("a-autoid-2-announce",5000,"Selection All Buying Options is not Enabled for Selection");

            });
            it("TestCase 14 : Read More Buying Options vendors count and  Price Range",function () {
                browser.sleep(5000);  //sleep for 5sec
                var MoreBuyingOptions= locators_Objects.verify_Is_Present_by_Xpath(".//*[contains(text(),'More Buying Choices')]",true);
                if(MoreBuyingOptions){
                    Vendors_Choice1 = locators_Objects.getTextby_XPath(".//*[@id='mediaOlp']//div[2]/div/span[1]/a").then(function (vendors) {
                         return vendors;
                    });
                    Price_StartWith1= locators_Objects.getTextby_XPath(".//*[@id='mediaOlp']//div[2]/div/span[1]/span").then(function (prices) {
                        return prices;
                    });
                    console.log("More Buying Options Vendors are "+ Vendors_Choice1 + " price starting from" + Price_StartWith1);
                }
                else{
                    console.log("No 'More Buying Options' are displayed")
                }
            });
            it("TestCase 15 : Read the Price of USED BOOK",function () {
                locators_Objects.verify_Is_Present_by_Xpath_Return(".//*[contains(text(),'Buy used')]").then(function (BuyUsed) {
                    if(BuyUsed){
                        locators_Objects.clickby_Xpath(".//*[contains(text(),'Buy used')]");
                        locators_Objects.getTextby_ClassName("a-size-medium a-color-price header-price").then(function (getText_Price) {
                            console.log("Price of USED_Book is " + getText_Price);
                        });
                    }else {
                        console.log("No Used Book Available");
                    }
                })


            });
            it("TestCase 16 : Buy Used - Verify 'Buy Now' Option is available for Used Book and 'Add to Cart' option is available ",function () {

                locators_Objects.verify_Is_Present_by_Xpath(".//*[@id='usedOfferAccordionRow']//*[contains(text(),'Buy Now')]",false);
                browser.driver.wait(EC.elementToBeClickable(element(by.name('submit.add-to-cart-ubb'))), 5000,"Add to Cart is unavailable ");


            });
            it("TestCase 17 : Verify Used Book is 'IN STOCK' or Not ",function(){
                var InstockIsAvailable = locators_Objects.verify_Is_Present_by_Xpath("//*[@id='usedOfferAccordionRow']//*[contains(text(),'In Stock')]",true);
                if(InstockIsAvailable){
                        console.log("Used Book is IN STOCK")
                    } else{
                        console.log("Used Book is OUT OF STOCK")
                    }
            });


        })
            
               

});