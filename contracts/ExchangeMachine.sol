// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

import "./Sollunah.sol";

contract ExchangeMachine  {

    // Using Libs
    using Math for uint256;

    // Events
    event Killed(address killedBy);
    event RefillT(address sender, uint256 amount, address contrato);
    event RefillE(address sender, uint256 amount);
    event Purchase(address sender, uint256 amountOfTokens, address contrato);
    event SellTokens(address sender, uint256 amount, address contrato);
    event ChangeState(address sender, Status estado); //?
    event ChangeTokensPerEth(address sender, uint256 tokensPerEth);
    event ChangeEthPerToken(address sender, uint256 ethPerToken);
    event WithdrawEthers(address sender, address receiver);
  
    // Enum
    enum Status { ACTIVE, PAUSED, CANCELLED } // mesmo que uint8

    // Properties
    address payable private owner;
    address public tokenAddress;
    Status contractState;
    uint public tokensPerEth = 100;
    uint public ethPerToken = 100;

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
    mapping (address => uint) public tokenBalance;

    constructor(address token) {
        owner = payable(msg.sender);
        tokenAddress = token;
        contractState = Status.ACTIVE;
    }

    // Allow the owner to increase the smart contract's sollunah balance
    function refillTokens(uint256 amount) public isActived isOwner {
        require(amount >= tokensPerEth, "You must refill minimum tokens per ether amount");
        Sollunah(tokenAddress).refill(address(this), amount, msg.sender);
        tokenBalance[address(this)] = tokenBalance[address(this)].add(amount);
        emit RefillT(msg.sender, amount, address(this));
    }

    function refillEthers() public payable isActived isOwner {
        uint amount = (msg.value/(10 ** 18));
        require(amount != 0, "You must refill at least 1 ether");
        payable(owner).transfer(amount);
        emit RefillE(owner, amount); 
    }

    // Allow anyone to purchase sollunah
    function purchase() public payable {
        uint amountOfTokens = (msg.value/(10 ** 18)) * tokensPerEth;
        require(msg.value >= 1 ether, "You must pay at least 1 ETH per sollunah batch");
        require(tokenBalance[address(this)] >= amountOfTokens, "Not enough sollunah in stock to complete this purchase");
        tokenBalance[address(this)] -= amountOfTokens;
        tokenBalance[msg.sender] += amountOfTokens;
        Sollunah(tokenAddress).transfer(msg.sender, amountOfTokens);
        emit Purchase(msg.sender, amountOfTokens,address(this));
    }

    function sellTokens(uint256 amount) public payable {
        uint amountOfEthers = (((amount/ethPerToken)*(10**18))/10)*9;
        require(amount >= tokensPerEth,"You must pay at least 1 sollunah batch per ETH");
        require(getBalance() >= amountOfEthers, "Not enough Ethers in stock to complete this purchase");
        require(Sollunah(tokenAddress).sell(address(this), amount, msg.sender) == true, "Erro na Sell");
        address payable to = payable(msg.sender);
        to.transfer(amountOfEthers);
        emit SellTokens(msg.sender, amount, address(this));
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
        emit ChangeState(msg.sender, contractState);
        return true;
    }

    function state() public view returns(Status) {
        return contractState;
    }
    
    function changeTokensPerEth(uint256 newtokensPerEth) public isOwner{
        require(newtokensPerEth != 0, "You must charge at least 1 token per ETH");
        tokensPerEth = newtokensPerEth;
        emit ChangeTokensPerEth(msg.sender, tokensPerEth);
    }

    function changeEthPerToken(uint256 newEthPerToken) public isOwner{
        require(newEthPerToken != 0, "You must charge at least 1 token per ETH");
        ethPerToken = newEthPerToken;
        emit ChangeEthPerToken(msg.sender, ethPerToken);
    }

    function getBalance() public view returns(uint256) {
        return address(this).balance;
    }

    function withdrawEthers() public payable isOwner {
        address payable to = payable(msg.sender);
        to.transfer(getBalance());
        emit WithdrawEthers(msg.sender, to);
    }

    function changeOwner(address payable newOwnerContract) public isOwner returns (bool){
        owner = newOwnerContract;
        //emit OwnerChanged(owner, newOwnerContract);

        return true;
    }
    
    // Kill
    function kill() public isOwner {
        require(contractState == Status.CANCELLED, "It's necessary to cancel the contract before to kill it!");
        emit Killed(msg.sender);
        address payable to = payable(msg.sender);
        to.transfer(getBalance());
        Sollunah(tokenAddress).transfer(msg.sender, tokenBalance[address(this)]);
        selfdestruct(owner);
    }

}