const laselector = { 
  firstline: '[name="establishment_address_line_1"]',
  postcode: '[name="establishment_postcode_find"]',
  manualPostcode: '[name="establishment_postcode"]',
  findAddress: "#find-address",
  firstOption: "#local_authority__option--0",
  postcodeDisplay: "#main-content > div > div > form > fieldset > legend > h1",
  cannotFindPostcodeHeading: "#main-content > div > div > fieldset > legend > h1",
  postcodeLocator:"#local_authority",
  estabPostcodeFind: "#establishment_postcode_find",
  noCouncilHeading:"#main-heading",
  changePostcode: "#main-content > div > div > form > dl > div > dd.govuk-summary-list__actions > a",
  postcodeDropdown: "#establishmentAddressDropdown",
  street: '[name="establishment_address_line_2"]', 
  town: '[name="establishment_town"]',
  button: ".govuk-button",
  error: ".govuk-error-message",
  cantFindAddressLink: "#cantFindAddressLink",
  locality: '[name="establishment_address_line_3"]',
  backButton: "body > div > nav > div.govuk-grid-row > div.govuk-grid-column-two-thirds > a"
};
module.exports = laselector;
