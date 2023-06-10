// require("@nomicfoundation/hardhat-toolbox");

// /** @type import('hardhat/config').HardhatUserConfig */
// module.exports = {
//   solidity: "0.8.18",
// };

require("dotenv").config({});
const alchemyUrl = process.env.ALCHEMY_URL;
const alchemyAPIKey = process.env.ALCHEMY_API_KEY;
const myKey = process.env.MY_KEY;

require("@nomicfoundation/hardhat-ethers");

module.exports = {
  solidity: "0.8.18",
  defaultNetwork: "sepolia",
  networks: {
    hardhat: {},
    sepolia: {
      url: alchemyUrl,
      accounts: [myKey],
    },
  },
};
