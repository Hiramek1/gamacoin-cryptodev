const { assert, expect } = require('chai')
const { ethers } = require("hardhat");
const sollunah = require("../contracts")


describe("isExchangeMachineDeployed", () => {
  it("Should return contract address", async () => {
    const TokenFactory = await ethers.getContractFactory("exchangeMachine");
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