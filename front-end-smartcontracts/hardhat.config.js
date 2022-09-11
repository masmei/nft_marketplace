require("@nomiclabs/hardhat-waffle");
require("dotenv").config();

module.exports = {
  solidity: "0.8.4",
  paths: {
    artifacts: "./src/backend/artifacts",
    sources: "./src/backend/contracts",
    cache: "./src/backend/cache",
    tests: "./src/backend/test"
  },
  mainnet: {
    url: "https://mainnet.infura.io/v3/3b87444ab13342fca6a10a853ddc9244",
    accounts: [process.env.PRIVATE_KEY],
  }
};
