const estabAddress = { 
  firstline: '[name="establishment_address_line_1"]',
  postcode: '[name="establishment_postcode_find"]',
  manualPostcode: '[name="establishment_postcode"]',
  findAddress: "#find-address",
  postcodeDisplay: "#main-content > div > div > form > dl > div > dd.govuk-summary-list__value",
  changePostcode: "#main-content > div > div > form > dl > div > dd.govuk-summary-list__actions > a",
  postcodeDropdown: "#establishmentAddressDropdown",
  street: '[name="establishment_address_line_2"]',
  town: '[name="establishment_town"]',
  button: ".govuk-button",
  error: ".govuk-error-message",
  cantFindAddressLink: "#select-link",
  locality: '[name="establishment_address_line_3"]'
};

module.exports = estabAddress;
