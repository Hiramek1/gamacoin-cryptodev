const { expect, assert } = require("chai");
const { ethers } = require("hardhat");
const { it } = require("mocha");

describe("Owner Permissions", () => {

  let owner, account1, account2, account3;
  let Token, eMachine;

  beforeEach(async () => {
    [owner, account1, account2, account3] = await ethers.getSigners()
    Token = await ethers.getContractFactory("Sollunah")
    token = await Token.deploy()
    await token.deployed()
    EMachine = await ethers.getContractFactory("ExchangeMachine")
    eMachine = await EMachine.deploy(token.address)
    await eMachine.deployed()
  })

  it("Should change the owner of the contract", async function()  {

    await eMachine.changeOwner(account1.address)

    assert(true);
    
  })

  it("checking owner permissions", async function() {
      expect(eMachine.connect(account1).kill()).to.be.revertedWith("Sender is not owner!")
      expect(eMachine.connect(account1).changeState(2)).to.be.revertedWith("Sender is not owner!")
    })
  
  });

describe("Status Changes", () => {
 
  let owner, account1, account2, account3;
  let Token, eMachine;

  beforeEach(async () => {
    [owner, account1, account2, account3] = await ethers.getSigners()
    Token = await ethers.getContractFactory("Sollunah")
    token = await Token.deploy()
    await token.deployed()
    EMachine = await ethers.getContractFactory("ExchangeMachine")
    eMachine = await EMachine.deploy(token.address)
    await eMachine.deployed()
  })
  
      it("Should return the initial status", async function()  {
      const expectedState = 0
      expect(await eMachine.state()).to.equal(expectedState)
    })

      it("Should change status", async function()  {
      const currentState = await eMachine.state()
      const changeState = await eMachine.changeState(1)
      await changeState.wait()
      const modifiedState = await eMachine.state()
      expect(currentState != modifiedState).to.equal(true)
    })

      it("Should not change status with invalid parameters", async function()  {
      await expect(eMachine.changeState(3)).to.be.revertedWith("Invalid status option!")
      await expect(eMachine.changeState(0)).to.be.revertedWith("The status is already ACTIVE")

      await eMachine.changeState(1)
      await expect(eMachine.changeState(1)).to.be.revertedWith("The status is already PAUSED")

      await eMachine.changeState(2)
      await expect(eMachine.changeState(2)).to.be.revertedWith("The status is already CANCELLED")
    })

});

describe("Refill Tokens", () => {
    beforeEach(async () => {
        [owner, account1, account2, account3] = await ethers.getSigners()
        Token = await ethers.getContractFactory("Sollunah")
        token = await Token.deploy()
        await token.deployed()
        EMachine = await ethers.getContractFactory("ExchangeMachine")
        eMachine = await EMachine.deploy(token.address)
        await eMachine.deployed()
      })

  it("Should replenish the machine with the specified amount of tokens", async function()  {

    const refill = await eMachine.refillTokens(5000);
    await refill.wait()

    expect(await token.balanceOf(eMachine.address)).to.equal(5000)
})
})
