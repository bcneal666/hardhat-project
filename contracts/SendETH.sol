// SPDX-License-Identifier: MIT
pragma solidity ^0.8.21;

import {Fallback} from "./Fallback.sol";

contract SendETH {
    event Received(address _sender, uint _amount);
    error SendFailed();
    error CallFailed();
    Fallback public fallbackFn;
    address payable public owner;

    constructor() payable {
        fallbackFn = new Fallback();
        owner = payable(msg.sender);
    }

    receive() external payable {
        emit Received(msg.sender, msg.value);
    }

    function transferETH(address payable _to, uint _amount) external payable {
        _to.transfer(_amount);
    }

    function sendETH(address payable _to, uint _amount) external payable {
        bool success = _to.send(_amount);
        if (!success) revert SendFailed();
    }

    function callETH(address payable _to, uint _amount) external payable {
        (bool success, ) = _to.call{value: _amount}("");
        if (!success) revert SendFailed();
    }
}
