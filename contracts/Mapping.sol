// SPDX-License-Identifier: MIT
import "hardhat/console.sol";

pragma solidity ^0.8.21;

contract Mapping {
    mapping(uint => address) public idToAddr;
    mapping(address => address) swapPair;

    function writeMap(uint _id, address _addr) public {
        idToAddr[_id] = _addr;
    }

    function writeSwapPair(address _token, address _pair) public {
        swapPair[_token] = _pair;
        console.log("swapPair for %s is %s", _token, _pair);
    }

    function readSwapPair(address _token) public view returns (address) {
        return swapPair[_token];
    }
}
