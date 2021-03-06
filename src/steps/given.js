import checkContainsAnyText from '../support/check/checkContainsAnyText';
import checkIsEmpty from '../support/check/checkIsEmpty';
import checkContainsText from '../support/check/checkContainsText';
import checkCookieContent from '../support/check/checkCookieContent';
import checkCookieExists from '../support/check/checkCookieExists';
import checkDimension from '../support/check/checkDimension';
import checkElementExists from '../support/check/checkElementExists';
import checkEqualsText from '../support/check/checkEqualsText';
import checkModal from '../support/check/checkModal';
import checkOffset from '../support/check/checkOffset';
import checkProperty from '../support/check/checkProperty';
import checkSelected from '../support/check/checkSelected';
import checkTitle from '../support/check/checkTitle';
import checkUrl from '../support/check/checkURL';
import closeAllButFirstTab from '../support/action/closeAllButFirstTab';
import compareText from '../support/check/compareText';
import isEnabled from '../support/check/isEnabled';
import isDisplayed from '../support/check/isDisplayed';
import isVisible from '../support/check/isDisplayed';
import openWebsite from '../support/action/openWebsite';
import setWindowSize from '../support/action/setWindowSize';
import injectDataIntoRegSummary from "../support/action/injectDataIntoRegSummary";
import switchTab from "../support/action/switchTab";
import deleteAllCookies from "../support/action/deleteAllCookies";

const { Given } = require('cucumber');

Given(
    /^I go to a special QA page at url "([^"]*)?" with injected "([^"]*)?" data$/,
    { wrapperOptions: { retry: 2 } },
    injectDataIntoRegSummary
);

Given(/^I delete all my cookies$/, deleteAllCookies);

Given(
    /^I open the (url|site) "([^"]*)?"$/,
    { wrapperOptions: { retry: 2 } },
    openWebsite
);

Given("I change my viewport", () => (setWindowSize(2048,1536)));

Given(/^I switch to the first tab$/,
    { wrapperOptions: { retry: 2 } },
    switchTab);

Given(/^the element "([^"]*)?" is( not)* visible$/,
    { wrapperOptions: { retry: 2 } },
    isVisible);
Given(
    /^the element "([^"]*)?" is( not)* displayed$/,
    { wrapperOptions: { retry: 2 } },
    isDisplayed
);

Given(
    /^the element "([^"]*)?" is( not)* enabled$/,
    { wrapperOptions: { retry: 2 } },
    isEnabled
);

Given(
    /^the element "([^"]*)?" is( not)* selected$/,
    { wrapperOptions: { retry: 2 } },
    checkSelected
);

Given(
    /^the checkbox "([^"]*)?" is( not)* checked$/,
    { wrapperOptions: { retry: 2 } },
    checkSelected
);

Given(
    /^there is (an|no) element "([^"]*)?" on the page$/,
    { wrapperOptions: { retry: 2 } },
    checkElementExists
);

Given(
    /^the title is( not)* "([^"]*)?"$/,
    checkTitle
);

Given(
    /^the element "([^"]*)?" contains( not)* the same text as element "([^"]*)?"$/,
    { wrapperOptions: { retry: 2 } },
    compareText
);

Given(
    /^the (button|element) "([^"]*)?"( not)* matches the text "([^"]*)?"$/,
    { wrapperOptions: { retry: 2 } },
    checkEqualsText
);

Given(
    /^the (button|element|container) "([^"]*)?"( not)* contains the text "([^"]*)?"$/,
    { wrapperOptions: { retry: 2 } },
    checkContainsText
);

Given(
    /^the (button|element) "([^"]*)?"( not)* contains any text$/,
    { wrapperOptions: { retry: 2 } },
    checkContainsAnyText
);

Given(
    /^the (button|element) "([^"]*)?" is( not)* empty$/,
    checkIsEmpty
);

Given(
    /^the page url is( not)* "([^"]*)?"$/,
    checkUrl
);

Given(
    /^the( css)* attribute "([^"]*)?" from element "([^"]*)?" is( not)* "([^"]*)?"$/,
    checkProperty
);

Given(
    /^the cookie "([^"]*)?" contains( not)* the value "([^"]*)?"$/,
    checkCookieContent
);

Given(
    /^the cookie "([^"]*)?" does( not)* exist$/,
    checkCookieExists
);

Given(
    /^the element "([^"]*)?" is( not)* ([\d]+)px (broad|tall)$/,
    checkDimension
);

Given(
    /^the element "([^"]*)?" is( not)* positioned at ([\d]+)px on the (x|y) axis$/,
    checkOffset
);

Given(
    /^I have a screen that is ([\d]+) by ([\d]+) pixels$/,
    setWindowSize
);

Given(
    /^I have closed all but the first (window|tab)$/,
    closeAllButFirstTab
);

Given(
    /^a (alertbox|confirmbox|prompt) is( not)* opened$/,
    checkModal
);
