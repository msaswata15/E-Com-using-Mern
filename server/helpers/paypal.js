const paypal = require("paypal-rest-sdk");

paypal.configure({
  mode: "sandbox",
  client_id: "ASKOtIqc56h4bSmAZ2Exa782Wx2cc3xAYt3Wm4vMn3BAU19dCOyyxe4yjy8fNCiRRdmNaIZr2VnWCwLK",
  client_secret: "EFdRjn5N3uJU8Vxe_lV2ddfcDsPRiVl927Pf8UIFXUDY8DbLRnk1JqYOleRq1s0KPpbIoGK3cprM1eks",
});

module.exports = paypal;
