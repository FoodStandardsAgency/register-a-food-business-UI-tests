const opAddress = {
  firstline: '[name="operator_address_line_1"]',
  street: '[name="operator_address_line_2"]',
  locality: '[name="operator_address_line_3"]',
  town: '[name="operator_town"]',
  postcode: '#operator_postcode_find',
  manualPostcode: '[name="operator_postcode"]',
  findAddress: "#find-address",
  postcodeDisplay: "#main-content > div > div > form > dl > div > dd.govuk-summary-list__value",
  changePostcode: "#main-content > div > div > form > dl > div > dd.govuk-summary-list__actions > a",
  postcodeDropdown: "#operatorAddressDropdown",
  cantFindAddressLink: "#cantFindAddressLink",
  button: ".govuk-button",
  error: ".govuk-error-message"
};

module.exports = opAddress;
