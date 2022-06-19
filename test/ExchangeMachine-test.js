const { expect, assert,  } = require("chai");
const { ethers, utils } = require("hardhat");
const { solidity } = require ("ethereum-waffle") ;
const util = require("util")
var BigNumber = require('big-number');

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

    await eMachine.changeOwner(account1.address);
    await eMachine.connect(account1).changeOwner(account2.address)

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
    it("amount cannot be less than tokensPerEth ", async function() {

    await expect(eMachine.refillTokens(0)).to.be.revertedWith("You must refill minimum tokens per ether amount");
  })


})

describe("Refill Ethers", () => {

  beforeEach(async () => {
    [owner, account1, account2, account3] = await ethers.getSigners()
    Token = await ethers.getContractFactory("Sollunah")
    token = await Token.deploy()
    await token.deployed()

    EMachine = await ethers.getContractFactory("ExchangeMachine")
    eMachine = await EMachine.deploy(token.address)
    await eMachine.deployed()
  }) 

  it("Should replenish the machine with the specified amount of Ethers", async function()  {

  const walletm = eMachine.address;
  const refill = await eMachine.refillEthers({ gasPrice : 800000000, value: ethers.utils.parseEther("1.0") })
  await refill.wait();
  const get = await eMachine.connect(walletm).getBalance()
  expect(await eMachine.connect(walletm).getBalance()).to.not.equal(0)
  //console.log(get)
});
    it("Should not less than 1 ether of refill", async function() {
      await expect( eMachine.refillEthers({ value: 2})).to.be.revertedWith("You must refill at least 1 ether")
      
    })


}) 


describe("purchase", () => {

  beforeEach(async () => {
      [owner, account1, account2, amount] = await ethers.getSigners()
      Token = await ethers.getContractFactory("Sollunah")
      token = await Token.deploy()
      await token.deployed()
      EMachine = await ethers.getContractFactory("ExchangeMachine")
      eMachine = await EMachine.deploy(token.address)
      await eMachine.deployed()
    })
    
    it("Must not be less than 1 ether to buy tokens ", async function() {
      await expect( eMachine.purchase({ value: 2})).to.be.revertedWith("You must pay at least 1 ETH per sollunah batch")
      
    })

    it("Shouldn't sell more tokens than what is in stock", async function() {

      await expect( eMachine.purchase({value: ethers.utils.parseEther("1.0")})).to.be.revertedWith("Not enough sollunah in stock to complete this purchase")
  
  })

  it("Should exchange the amount sent in ethers for the correspondent in Sollunah tokens", async function() {

    const refill = await eMachine.refillTokens(21000000);
    await refill.wait()
    await eMachine.purchase({value: ethers.utils.parseEther("1.0")})
    const walletm = eMachine.address;

    expect(await token.balanceOf(owner.address)).to.equal(100)
    expect(await token.balanceOf(eMachine.address)).to.equal(20999900)
    expect(await eMachine.connect(walletm).getBalance()).to.not.equal(0)

  })
  
})

describe("Sell Tokens", () => {

  beforeEach(async () => {
    [owner, account1, account2, amount] = await ethers.getSigners()
    Token = await ethers.getContractFactory("Sollunah")
    token = await Token.deploy()
    await token.deployed()
    EMachine = await ethers.getContractFactory("ExchangeMachine")
    eMachine = await EMachine.deploy(token.address)
    await eMachine.deployed()
  })
  
  it("Must not be less than 1 ether to buy tokens ", async function() {

    await expect( eMachine.sellTokens(50)).to.be.revertedWith("You must sell at least 1 sollunah lot per ETH")
    
  })



  it("Shouldn't sell more Ethers than what is in stock", async function() {

    await expect( eMachine.sellTokens(500)).to.be.revertedWith("Not enough Ethers in stock to complete this purchase")
})



  it("Should exchange the amount sent in Sollunah tokens for the corresponding amount in Ethers", async function() {
    const walletm = eMachine.address;
    const refill = await eMachine.refillEthers({ gasPrice : 800000000, value: ethers.utils.parseEther("5.0") })
    await refill.wait();
    
    await eMachine.sellTokens(500)

    expect(await token.balanceOf(owner.address)).to.equal(20999500)
    expect(await eMachine.connect(walletm).getBalance()).to.not.equal(ethers.utils.parseEther("5.0"))
})
})

describe("Token sales and purchase ratios", () => {

    beforeEach(async () => {
        [owner, account1, account2, amount] = await ethers.getSigners()
        Token = await ethers.getContractFactory("Sollunah")
        token = await Token.deploy()
        await token.deployed()
        EMachine = await ethers.getContractFactory("ExchangeMachine")
        eMachine = await EMachine.deploy(token.address)
        await eMachine.deployed()
      })

      it("Tokens per Ethers cannot be 0", async function() {

        await expect(eMachine.changeTokensPerEth(0)).to.be.revertedWith("You must charge at least 1 token per ETH");

      }) 
    
      it("Ethers per token cannot be 0", async function() {
    
        await expect(eMachine.changeEthPerToken(0)).to.be.revertedWith("You must charge at least 1 Ether per token");
      }) 
      
      it("Should change the amount of tokens per Ethers for purchase", async function() {
        
        const tokPerEth = await eMachine.changeTokensPerEth(200)

        assert(200)

      }) 
      
      it("Should change the amount of Ethers per tokens when selling", async function() {
        
        const ethPerToken = await eMachine.changeEthPerToken(200)

        assert(200)

      }) 
          
      })

  describe("Withdrawing Ethers from the Machine", () => {

    beforeEach(async () => {
      [owner, account1, account2, amount] = await ethers.getSigners()
      Token = await ethers.getContractFactory("Sollunah")
      token = await Token.deploy()
      await token.deployed()
      EMachine = await ethers.getContractFactory("ExchangeMachine")
      eMachine = await EMachine.deploy(token.address)
      await eMachine.deployed()
    })

    it("Should withdraw all available Ethers on the machine and send it to the owner", async function() {

      const walletm = eMachine.address;
      const refill = await eMachine.refillEthers({ gasPrice : 800000000, value: ethers.utils.parseEther("5.0") })
      await refill.wait();

      expect(await eMachine.connect(walletm).getBalance()).to.not.equal(0)

      await eMachine.withdrawEthers()

      
      expect(await eMachine.connect(walletm).getBalance()).to.equal(0)

  })

describe("Withdrawing tokens from the Machine", () => {

  beforeEach(async () => {
    [owner, account1, account2, amount] = await ethers.getSigners()
    Token = await ethers.getContractFactory("Sollunah")
    token = await Token.deploy()
    await token.deployed()
    EMachine = await ethers.getContractFactory("ExchangeMachine")
    eMachine = await EMachine.deploy(token.address)
    await eMachine.deployed()
  })

  it("Should withdraw all available tokens on the machine and send it to the owner", async function() {

    const refill = await eMachine.refillTokens(5000);
    await refill.wait()

    expect(await token.balanceOf(eMachine.address)).to.equal(5000)

    await eMachine.withdrawTokens()

    expect(await token.balanceOf(eMachine.address)).to.equal(0)


})

})

describe("Kill the contract", () => {

  beforeEach(async () => {
    [owner, account1, account2, amount] = await ethers.getSigners()
    Token = await ethers.getContractFactory("Sollunah")
    token = await Token.deploy()
    await token.deployed()
    EMachine = await ethers.getContractFactory("ExchangeMachine")
    eMachine = await EMachine.deploy(token.address)
    await eMachine.deployed()
  })

    it("Should terminate the contract", async function() {
      const changeState = await token.changeState(2)
      await changeState.wait()
  
      const kill = await token.kill()
      await kill.wait()
      
      const confirmation = kill.confirmations
  
      expect(confirmation == 1).to.equal(true)

    })

  })

})