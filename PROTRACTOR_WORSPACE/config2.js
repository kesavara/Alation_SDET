
//require('jasmine-given');
//var jasmineReporters = require('jasmine-reporters');
var SpecReporter = require('jasmine-spec-reporter').SpecReporter;
var Jasmine2HtmlReporter = require('protractor-jasmine2-html-reporter');
var fs = require('fs');
//require('protractor').Logger.logLevel = 1; given below in config file.


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
    allScriptsTimeout: 500000,
    ignoreUncaughtExceptions: true,
    suites: {
       // LIST : './spec/LIST/*_Spec.js',
        USER_ROLES : ['./spec/USER_ROLES/ACCMANG_USER_Role/*_Spec.js','./spec/USER_ROLES/ADMIN_USER_Role/*_Spec.js','./spec/USER_ROLES/Agent_USER_Role/*_Spec.js',
                        './spec/USER_ROLES/CallCenter_USER_Role/*_Spec.js','./spec/USER_ROLES/REPORTING_USER_Role/*_Spec.js',
                         './spec/USER_ROLES/SUPER_USER_Role/*_Spec.js','./spec/USER_ROLES/User_User_Role/*_Spec.js'],
        QA_Task :['./spec/QA_task_Automated/Qa_11498_Agent_Group_Dashboard_Spec.js','./spec/QA_task_Automated/PLAN/*_Spec.js'],
        FindAccounts: ['./spec/Find_Account_Page/FindAccount_By_AccountInfo_Spec.js', './spec/Find_Account_Page/FindAccount_By_UserInfo_Spec.js']

    },
    //specs : './spec/LIST/ListPage_EM_Acc_Spec.js',
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

        //browser.get('http://www.angularjs.org');


        // better jasmine 2 reports...
        global.isAngularSite = function(flag){
            browser.driver.ignoreSynchronization = !flag;
        };
       // Remove files in Specified Directory

        jasmine.getEnv().addReporter(new SpecReporter({
            spec: {
                displayStacktrace: true,
                displayFailuresSummary: true
            }

        }));
        var jasmineReporters = require('jasmine-reporters');
        jasmine.getEnv().addReporter(new jasmineReporters.JUnitXmlReporter({
            consolidateAll: true,
            savePath: './reports/JunitXML_Report/',
            cleanDestination: true,
            filePrefix: 'Alation_TestResult_XML',
            fileNameSuffix: '_Amazon',
            fileNameDateSuffix: true
        }));

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
    specs : ['./spec/Kindle_TestSuite.js']   //'./spec/General_PaperBack_TestSuite.js',
   // specs : ['./spec/General_PaperBack_TestSuite.js','./spec/Kindle_TestSuite.js']   //'./spec/General_PaperBack_TestSuite.js',




};
