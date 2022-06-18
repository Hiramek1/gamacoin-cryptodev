const { expect, assert } = require("chai");
const { ethers } = require("hardhat");
const { it } = require("mocha");


describe("Owner Permissions", () => {

  let owner, account1, account2, account3;
  let Token, token;

  beforeEach(async () => {
    [owner, account1, account2, account3] = await ethers.getSigners()
    Token = await ethers.getContractFactory("Sollunah")
    token = await Token.deploy()
    await token.deployed()
    const zeroWallet = "0x0000000000000000000000000000000000000000"; 
  })

  it("Should change the owner of the contract", async function()  {

    await token.changeOwner(account1.address)

    assert(true);
    
  })

  it("checking owner permissions", async function() {
      expect(token.connect(account1).toMint(1000)).to.be.revertedWith("Sender is not owner!")
      expect(token.connect(account1).toBurn(1000)).to.be.revertedWith("Sender is not owner!")
      expect(token.connect(account1).kill()).to.be.revertedWith("Sender is not owner!")
      expect(token.connect(account1).changeState(2)).to.be.revertedWith("Sender is not owner!")
    })

  
  });

  describe("isBalanceWorth", () => {
    beforeEach(async () => {
      [owner, account1, account2, account3] = await ethers.getSigners()
      Token = await ethers.getContractFactory("Sollunah")
      token = await Token.deploy()
      await token.deployed()
      const zeroWallet = "0x0000000000000000000000000000000000000000"; 
    })
    
    it("Owner balance should equal totalsupply after deployment", async function() {
    expect(await token.balanceOf(owner.address)).to.equal(21000000)  
    })

    it("Should subtract the sender balance and add to the recipient", async function() {

    const currentBalanceOwner = await token.balanceOf(owner.address)
    await token.transfer(account1.address, 100);  
    expect(await token.balanceOf(account1.address)).to.equal(100);
    expect(await token.balanceOf(owner.address)).to.equal(currentBalanceOwner - 100);

    await token.connect(account1).transfer(account2.address, 100);
    expect(await token.balanceOf(account2.address)).to.equal(100);
    expect(await token.balanceOf(account1.address)).to.equal(0);

   })
});

describe("transactFunctions", () => { 

  let zeroWallet = "0x0000000000000000000000000000000000000000"; 
  beforeEach(async () => {
    [owner,account1, account2, account3] = await ethers.getSigners()
    Token = await ethers.getContractFactory("Sollunah")
    token = await Token.deploy()
    await token.deployed()
    
  })
  
  it("Should carry out transactions simultaneously", async function()  {
    const currentBalanceOwner = await token.balanceOf(owner.address)
    const amountSent = [1000, 500, 1500]
    const transfers = [
      await token.transfer(account1.address, amountSent[0]),
      await token.transfer(account2.address, amountSent[1]),
      await token.transfer(account3.address, amountSent[2])
    ]

    for(let i = 0; i < transfers.length; i++) {
      let transferTx = transfers[i]
      transferTx.wait()
    }

    const modifiedBalanceOwner = await token.balanceOf(owner.address)
    const totalAmountSent = amountSent.reduce((soma, i) => parseInt(soma) + parseInt(i))
    expect(parseInt(currentBalanceOwner) - totalAmountSent).to.equal(modifiedBalanceOwner)
  })

    it("Should not transfer a balance greater than what you have", async function() {
    await expect(token.transfer(account1.address, 21000001)).to.be.revertedWith("Insufficient Balance to Transfer")
  })

  
  it("Should not send to a non-existent wallet", async function()  {
    //console.log(zeroWallet);
		await expect(token.transfer(zeroWallet, 10)).to.be.revertedWith("Account address can not be 0"); 
	})
 
 

});

describe("statusChanges", () => {
  beforeEach(async () => {
    [owner, account1, account2, account3] = await ethers.getSigners()
    Token = await ethers.getContractFactory("Sollunah")
    token = await Token.deploy()
    await token.deployed()
    const zeroWallet = "0x0000000000000000000000000000000000000000"; 
  })  
  
      it("Should only transfer if status is active", async function()  {
		  const pausable = await token.changeState(1);
		  await pausable.wait();

		  await expect(token.transfer(account1.address, 10)).to.be.revertedWith(
  			"The contract is not active!"
		  );
          
      it("Should return the initial status", async function()  {
      const expectedState = 0
      expect(await token.state()).to.equal(expectedState)
    })

      it("Should change status", async function()  {
      const currentState = await token.state()
      const changeState = await token.changeState(1)
      await changeState.wait()
      const modifiedState = await token.state()
      expect(currentState != modifiedState).to.equal(true)
    })

      it("Should not change status with invalid parameters", async function()  {
      await expect(token.changeState(3)).to.be.revertedWith("Invalid status option!")
      await expect(token.changeState(0)).to.be.revertedWith("The status is already ACTIVE")

      await token.changeState(1)
      await expect(token.changeState(1)).to.be.revertedWith("The status is already PAUSED")

      await token.changeState(2)
      await expect(token.changeState(2)).to.be.revertedWith("The status is already CANCELLED")
    })

});

describe("supplyControl", () => {
  beforeEach(async () => {
    [owner, account1, account2, account3] = await ethers.getSigners()
    Token = await ethers.getContractFactory("Sollunah")
    token = await Token.deploy()
    await token.deployed()
    const zeroWallet = "0x0000000000000000000000000000000000000000"; 
  })
    it("The minted value must be greater than 0", async function()  {
		await expect(token.toMint(0)).to.be.revertedWith(
			"Amount has to be greater than 0"
    )});
   

    it("Should add the amount of minted tokens to the owner and totalsupply", async function() {
    const currentTotalSupply = await token.TotalSupply()
    const currentBalanceOwner = await token.balanceOf(owner.address)

    const amount = 50000

    const toMint = await token.toMint(amount)
    await toMint.wait()

    const modifiedTotalSupply = await token.TotalSupply()
    const modifiedBalanceOwner = await token.balanceOf(owner.address)

    expect(parseInt(currentTotalSupply) + amount).to.equal(modifiedTotalSupply)
    expect(parseInt(currentBalanceOwner) + amount).to.equal(modifiedBalanceOwner)
  })

    it("Should subtract the amount of burned tokens to the owner and totalsupply", async function() {
    const currentTotalSupply = await token.TotalSupply()
    const currentBalanceOwner = await token.balanceOf(owner.address)

    const amount = 20000

    const toBurn = await token.toBurn(amount)
    await toBurn.wait()

    const modifiedTotalSupply = await token.TotalSupply()
    const modifiedBalanceOwner = await token.balanceOf(owner.address)

    expect(parseInt(currentTotalSupply) - amount).to.equal(modifiedTotalSupply)
    expect(parseInt(currentBalanceOwner) - amount).to.equal(modifiedBalanceOwner)
  })
    
  it("Should not terminate the contract if the status is not canceled", async function() {
    await expect(token.kill()).to.be.revertedWith("It's necessary to cancel the contract before to kill it")
  })

  it("Should terminate the contract", async function() {
    const changeState = await token.changeState(2)
    await changeState.wait()

    const kill = await token.kill()
    await kill.wait()
    
    const confirmation = kill.confirmations

    expect(confirmation == 1).to.equal(true)
    await expect(token.balanceOf(owner.address)).to.be.revertedWith(0);

  })

  it("Should not perform operations that require being the owner", async function(){
      expect(token.connect(account1).toMint(1000)).to.be.revertedWith("Sender is not owner!")
      expect(token.connect(account1).toBurn(1000)).to.be.revertedWith("Sender is not owner!")
      expect(token.connect(account1).kill()).to.be.revertedWith("Sender is not owner!")
      expect(token.connect(account1).changeState(2)).to.be.revertedWith("Sender is not owner!")
    })

  it("Should allow another wallet to move the specified amount of your wallet", async function(){
    const toApprove = await token.approve(account1.address, 5000)
    await toApprove.wait()
    
     expect(await token.allowance(owner.address,account1.address)).to.equal(5000); 
  })

  it("The delegated wallet should be able to transfer the balance of the allowed wallet", async function() {
    const toApprove = await token.approve(account1.address, 5000)
    await toApprove.wait()  
    //await token.connect(account1).transfer(account2.address, 100);
    await token.connect(account1).transferFrom(owner.address, account2.address, 5000);                        
    expect(await token.balanceOf(account2.address)).to.equal(5000);
    expect(await token.balanceOf(owner.address)).to.equal(21000000 - 5000);
})
    
})
})