// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

import "./token.sol";

contract ExchangeMachine  {

    // Using Libs

    // Structs


    // Enum
    enum Status { ACTIVE, PAUSED, CANCELLED } // mesmo que uint8

    // Properties
    address payable private owner;
    address public tokenAddress;
    address[] private subscribers;
    Status contractState; 
    uint public constant tokensPerEth = 100;
    
    // Modifiers
    modifier isOwner() {
        require(msg.sender == owner , "Sender is not owner!");
        _;
    }

    modifier isActived() {
        require(contractState == Status.ACTIVE, "The contract is not acvite!");
        _;
    }

   // Declare state variables of the contract
    mapping (address => uint) public tokenName;

    constructor(address token) {
        owner = payable(msg.sender);
        tokenAddress = token;
        contractState = Status.ACTIVE;
    }

    // When 'VendingMachine' contract is deployed:
    // 1. set the deploying address as the owner of the contract
    // 2. set the deployed smart contract's cupcake balance to 100
 
    // Allow the owner to increase the smart contract's cupcake balance
    function refillMachine(uint256 amount) public isActived isOwner {
        //require(msg.sender == owner, "Only the owner can refill.");  
        CryptoToken(tokenAddress).refill(address(this), amount, msg.sender);
        tokenName[address(this)] += amount;
    }

    // Allow anyone to purchase cupcakes
    function purchase() public payable {
        uint amountOfTokens = (msg.value/(10 ** 18)) * tokensPerEth;
        require(msg.value >= 1 ether, "You must pay at least 1 ETH per cupcake");
        //tokenName[address(this)] = amountOfTokens;
        require(tokenName[address(this)] >= amountOfTokens, "Not enough cupcakes in stock to complete this purchase");
        tokenName[address(this)] -= amountOfTokens;
        //tokenName[msg.sender] += amount;
        CryptoToken(tokenAddress).transfer(msg.sender, amountOfTokens);

    }

    function changeState(uint8 newState) public isOwner returns(bool) {
        require(newState < 3, "Invalid status option!");

        if (newState == 0) {
            require(contractState != Status.ACTIVE, "The status is already ACTIVE");
            contractState = Status.ACTIVE;
        } else if (newState == 1) {
            require(contractState != Status.PAUSED, "The status is already PAUSED");
            contractState = Status.PAUSED;
        } else {
            require(contractState != Status.CANCELLED, "The status is already CANCELLED");
            contractState = Status.CANCELLED;
        }

        return true;
    }

    function state() public view returns(Status) {
        return contractState;
    }

    // Kill
    function kill() public isOwner {
        contractState = Status.CANCELLED;
        selfdestruct(owner);
    }
    
}