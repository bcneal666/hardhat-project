// SPDX-License-Identifier: MIT
pragma solidity ^0.8.21;

contract Fallback {
    event Received(address _sender, uint _amount);
    event fallbacked(address _sender, uint _amount, bytes _data);
    address payable public owner;

    constructor() payable {
        owner = payable(msg.sender);
    }

    receive() external payable {
        emit Received(msg.sender, msg.value);
    }

    fallback() external payable {
        emit fallbacked(msg.sender, msg.value, msg.data);
    }

    function getBalance() public view returns (uint) {
        return address(this).balance;
    }
}
