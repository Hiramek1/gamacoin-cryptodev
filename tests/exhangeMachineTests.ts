const { assert, expect } = require('chai')
const { ethers } = require("hardhat");
const { sollunah, ExchangeMachine } = require("../contracts")

describe("exchangeMachine tests", () => {
  let sollunahInstance;
  let exchangeMachineInstance;
  before(async () => sollunahInstance = await sollunah.new())
  before(async () => exchangeMachineInstance = await ExchangeMachine.new())

  describe("isDeployed", () => {
    it("Should return contract address", async () => {
      const TokenFactory = await ethers.getContractFactory("exchangeMachineInstance");
      const TokenDeploy = await TokenFactory.deploy(1);
      await TokenDeploy.deployed();

      const deployAddress = await TokenDeploy.address;
    })
  });

  describe("isBalanceWorth", () => {

    it("Should return balance of some wallet", async () => {
      const supply = 1000;
      const [Owner] = await ethers.getSigners();

      const TokenFactory = await ethers.getContractFactory("exchangeMachine");
      const TokenDeploy = await TokenFactory.deploy(supply);
      await TokenDeploy.deployed();

      expect(await TokenDeploy.balanceOf(Owner.address)).to.equal(supply);

    })
  });

});