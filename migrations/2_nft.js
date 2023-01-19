const Team2NFT = artifacts.require("Team2NFT");
const Team2NFTV1 = artifacts.require("Team2NFTV1");

module.exports = function (deployer) {
  deployer.deploy(Team2NFT);
};

module.exports = function (deployer) {
  deployer.deploy(Team2NFTV1);
};

