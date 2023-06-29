const estabAddress = {
  firstline: '[name="establishment_address_line_1"]',
  postcode: '[name="establishment_postcode_find"]',
  manualPostcode: '[name="establishment_postcode"]',
  findAddress: "#find-address",
  firstOption: "#local_authority__option--0",
  postcodeDisplay: "#main-content > div > div > form > fieldset > legend > h1",
  cannotFindPostcodeHeading:
    "#main-content > div > div > fieldset > legend > h1",
  postcodeLocator: "#local_authority",
  estabPostcodeFind: "#establishment_postcode_find",
  noCouncilHeading: "#main-heading",
  changePostcode:
    "#main-content > div > div > form > dl > div > dd.govuk-summary-list__actions > a",
  postcodeDropdown: "#establishmentAddressDropdown",
  street: '[name="establishment_address_line_2"]',
  town: '[name="establishment_town"]',
  button: ".govuk-button",
  error: ".govuk-error-message",
  cantFindAddressLink: "#cantFindAddressLink",
  locality: '[name="establishment_address_line_3"]',
  backButton:
    "body > div.govuk-width-container > nav > div.govuk-grid-row > div.govuk-grid-column-two-thirds > a",
  backButtonEstablished:
    "body > div > nav > div.govuk-grid-row > div.govuk-grid-column-two-thirds > a",
  cantFindLA:
    "#main-content > div > div > form > div:nth-child(2) > div > div > label",
  postcodeFinder: "#postcode",
  errorPostcode: "#error-summary-ba73298e > div > h2",
  LAnotOnboarded: "#content > h1.heading-large",
  LAInvalidError:
    "#main-content > div > div > form > div.govuk-error-summary > div > h2",
};
module.exports = estabAddress;
