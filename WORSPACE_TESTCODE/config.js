

var SpecReporter = require('jasmine-spec-reporter').SpecReporter;
var Jasmine2HtmlReporter = require('protractor-jasmine2-html-reporter');
var fs = require('fs');




exports.config = {
    /**
     *  Uncomment ONE of the following to connect to: seleniumServerJar OR directConnect. Protractor
     *  will auto-start selenium if you uncomment the jar, or connect directly to chrome/firefox
     *  if you uncomment directConnect.
     */
    //seleniumServerJar: "node_modules/protractor/node_modules/webdriver-manager/selenium/selenium-server-standalone-3.3.1.jar",
    framework: 'jasmine2',
    directConnect: true,
    //restartBrowserBetweenTests: true,

    capabilities: {

        'browserName': 'chrome',
        'chromeOptions': {
            'args': ['incognito', '--start-maximized'],  // this line is for maximize the window and incognito view

            prefs: {
                'profile:managed_default_content_settings.notifications': 1,
                args: ['--no-sandbox', '--test-type=browser'],
                'download': {
                    'prompt_for_download': false,
                    'default_directory': './reports/Download/'
                },
            },
        },
    },

    // if we need to run on Firefox, Comment above Capabilites and uncomment below capabilities.

/*    capabilities:{

                browserName: 'firefox',
    },
*/
    allScriptsTimeout: 500000,       //max time each test wait
    ignoreUncaughtExceptions: true,


    // spec - Here we are mentioning the actual test thats need to be run.
    specs : ['./spec/General_PaperBack_TestSuite.js','./spec/Kindle_TestSuite.js'],

    //jasmine framework details
    jasmineNodeOpts: {
        isVerbose: true,
        showColors: true,
        includeStackTrace: true,
        displaySpecDuration: true,
        defaultTimeoutInterval: 360000,
        print: function () {
        }
    },
    logLevel:'INFO',


    onPrepare: function(){
        browser.manage().window().maximize();          // set browser size...
        rmDir('./reports/JunitXML_Report/');   // Remove files in Specified Directory
        require('./importedLib/waitReady.js');


        global.isAngularSite = function(flag){
            browser.driver.ignoreSynchronization = !flag;
        };
        // Remove files in Specified Directory
        // Reporting Configuration
        jasmine.getEnv().addReporter(new SpecReporter({
            spec: {
                displayStacktrace: true,
                displayFailuresSummary: true
            }

        }));

        var jasmineReporters = require('jasmine-reporters');
        //JUnitXml Reports
        jasmine.getEnv().addReporter(new jasmineReporters.JUnitXmlReporter({
            consolidateAll: true,
            savePath: './reports/JunitXML_Report/',      // you can find HTML and JunitXML reports under reports folder
            cleanDestination: true,
            filePrefix: 'Alation_TestResult_XML',
            fileNameSuffix: '_Amazon',
            fileNameDateSuffix: true
        }));
        //HTML Report
        jasmine.getEnv().addReporter(
            new Jasmine2HtmlReporter({
                savePath: './reports/HTML_Report/',
                takeScreenshots: true,
                takeScreenshotsOnlyOnFailures: true,
                consolidateAll: true,
                showPassed: true,
                // filePrefix: sessionId + 'AutomationReport',
                filePrefix: 'AutomationReport',
                cleanDestination: true,
            })
        );


    },





};

//Below JavaScript function is for remove Directory .

function rmDir (dirPath) {
    try {
        var files = fs.readdirSync(dirPath);
    }
    catch (e) {
        return;
    }
    if (files.length > 0)
        for (var i = 0; i < files.length; i++) {
            var filePath = dirPath + '/' + files[i];
            if (fs.statSync(filePath).isFile())
                fs.unlinkSync(filePath);
            else
                rmDir(filePath);
        }
    fs.rmdirSync(dirPath);
};

