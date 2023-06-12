const bankid = require("bankid").default;

const client = new bankid({
  production: false,
  test: true,
  pfx: "./path/to/your/pfx/file.pfx",
  passphrase: "yourPassphrase",
});

export default client;
