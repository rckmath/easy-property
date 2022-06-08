const TransferPropertyFactory = artifacts.require("TransferPropertyFactory");

module.exports = function (deployer) {
  deployer.deploy(TransferPropertyFactory);
};
