const datasets = {
  "registration-summary": {
    operator_type: "SOLETRADER",
    operator_address_line_1: "First line",
    operator_address_line_2: "Street",
    operator_address_line_3: "Somewhere",
    operator_town: "Town",
    operator_postcode: "AA11 1AA",
    operator_postcode_find: "AA11 1AA",
    operator_first_name: "Joe",
    operator_last_name: "Bloggs",
    operator_primary_number: "01234567890",
    operator_email: "email@email.com",
    registration_role: "SOLETRADER",
    establishment_trading_name: "Trading name",
    establishment_address_line_1: "First line",
    establishment_address_line_2: "Street",
    establishment_address_line_3: "Somewhere",
    establishment_town: "Town",
    establishment_postcode: "AA11 1AA",
    establishment_postcode_find: "AA11 1AA",
    establishment_type: "DOMESTIC",
    establishment_primary_number: "01434567890",
    establishment_email: "emfffsfsdfail@email.com",
    business_type: "Livestock farm",
    customer_type: "END_CONSUMER",
    supply_directly: "true",
    supply_other: "true",
    establishment_opening_status: "Establishment is already trading",
    day: "01",
    month: "01",
    year: "2001",
    opening_days_start: "Some days",
    opening_days_some: "Monday",
    opening_day_monday: "Monday",
    opening_hours_monday: "09:30 - 19:00",
    water_supply: "PUBLIC",
    directly_import: "Directly import",
  },
  "registration-summary-charity": {
    registration_role: "Representative",
    operator_type: "CHARITY",
    operator_first_name: "Percy",
    operator_last_name: "McPartnership",
    operator_charity_name: "My charity",
    operator_charity_number: "123456",
    operator_address_line_1: "First line",
    operator_address_line_2: "Street",
    operator_town: "Town",
    operator_postcode: "AA11 1AA",
    operator_primary_number: "01234567890",
    operator_email: "email@email.com",
    establishment_trading_name: "Trading name",
    establishment_address_line_1: "First line",
    establishment_address_line_2: "Street",
    establishment_town: "Town",
    establishment_postcode: "AA11 1AA",
    establishment_type: "DOMESTIC",
    business_type: "Livestock farm",
    establishment_opening_status: "Establishment is already trading",
    day: "01",
    month: "01",
    year: "2001",
    opening_days_irregular: "Every day",
    water_supply: "PUBLIC",
  },
  "registration-summary-partnership": {
    operator_type: "COMPANY",
    registration_role: "PARTNERSHIP",
    operator_first_name: "Percy",
    operator_last_name: "McPartnership",
    operator_address_line_1: "First line",
    operator_address_line_2: "Street",
    operator_town: "Town",
    operator_postcode: "AA11 1AA",
    operator_primary_number: "01234567890",
    operator_email: "email@email.com",
    establishment_trading_name: "Trading name",
    establishment_address_line_1: "First line",
    establishment_address_line_2: "Street",
    establishment_town: "Town",
    establishment_postcode: "AA11 1AA",
    establishment_type: "DOMESTIC",
    business_type: "Livestock farm",
    establishment_opening_status: "Establishment is already trading",
    day: "01",
    month: "01",
    year: "2001",
    opening_days_irregular: "Every day",
    partners: ["One", "Two", "Three"],
    main_partnership_contact: "One",
    water_supply: "PUBLIC",
  },
  "registration-summary-representative": {
    registration_role: "Representative",
    operator_type: "PERSON",
    operator_first_name: "Rebecca",
    operator_last_name: "McRepresentative",
    operator_address_line_1: "First line",
    operator_address_line_2: "Street",
    operator_town: "Town",
    operator_postcode: "AA11 1AA",
    operator_postcode_find: "AA11 1AA",
    operator_primary_number: "01234567890",
    operator_email: "email@email.com",
    establishment_trading_name: "Trading name",
    establishment_address_line_1: "First line",
    establishment_address_line_2: "Street",
    establishment_town: "Town",
    establishment_postcode: "AA11 1AA",
    establishment_postcode_find: "AA11 1AA",
    establishment_primary_number: "01434567890",
    establishment_email: "emfffsfsdfail@email.com",
    establishment_type: "DOMESTIC",
    business_type: "Livestock farm",
    customer_type: "END_CONSUMER",
    supply_directly: "true",
    supply_other: "true",
    establishment_opening_status: "Establishment is already trading",
    day: "01",
    month: "01",
    year: "2001",
    opening_days_irregular: "Every day",
    water_supply: "PUBLIC",
    directly_import: "Directly import",
  },
  "registration-summary-trading-every-day": {
    opening_days_start: "Every day",
  },
  declaration: {
    operator_first_name: "Fred",
    operator_last_name: "Bloggs",
    operator_postcode: "AA11 1AA",
    operator_postcode_find: "AA11 1AA",
    operator_address_line_1: "11",
    operator_address_line_2: "Some Street",
    operator_address_line_3: "Some Locality",
    operator_town: "London",
    operator_primary_number: "01234567890",
    operator_email: "testemail@email.com",
    registration_role: "SOLETRADER",
    establishment_trading_name: "Trading name",
    establishment_email: "establishment@email.com",
    establishment_primary_number: "01234567890",
    establishment_address_line_1: "First line",
    establishment_address_line_2: "Street",
    establishment_address_line_3: "Locality",
    establishment_town: "Town",
    establishment_postcode: "AA11 1AA",
    establishment_postcode_find: "AA11 1AA",
    establishment_type: "DOMESTIC",
    establishment_opening_status: "Establishment is already trading",
    opening_days_start: "Some days",
    opening_days_some: "Monday",
    opening_day_monday: "Monday",
    opening_hours_monday: "09:30 - 19:00",
    supply_directly: "true",
    supply_other: "true",
    business_type: "Livestock farm",
    customer_type: "END_CONSUMER",
    day: "01",
    month: "01",
    year: "2001",
    directly_import: "Directly import",
    water_supply: "PUBLIC",
  },
  "blank-partnership": {
    registration_role: "PARTNERSHIP",
  },
  "two-partnership": {
    registration_role: "PARTNERSHIP",
    partners: ["one", "two"],
  },
};

datasets["registration-summary-welsh"] = {
  ...datasets["registration-summary"],
  business_type: "Fferm da byw",
  language: "cy",
};

module.exports = async (url, selectedDataset) => {
  const dataToInject = datasets[selectedDataset];

  // Add the QA key to the dataToInject object prior to encoding
  if (process.env.QA_KEY) {
    dataToInject.QA_KEY = process.env.QA_KEY;
  } else {
    throw new Error(
      "process.env.QA_KEY not found. Please check your local .env file."
    );
  }

  // function to create a URL-encoded query string from an object.
  // e.g. {key: value, name: John Smith} is returned as "key=value&name=John%20Smith"
  const encode = (obj) => {
    var str = [];
    for (var p in obj)
      if (p === "partners") {
        for (var partner in obj[p]) {
          str.push(
            encodeURIComponent(p) + "=" + encodeURIComponent(obj[p][partner])
          );
        }
      } else {
        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
      }
    return str.join("&");
  };

  // go to the QA URL with the query appended
  console.error(`${url}?${encode(dataToInject)}`);
  await browser.url(`${url}?${encode(dataToInject)}`);

  //browser.pause(3000);
};
