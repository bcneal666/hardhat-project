// SPDX-License-Identifier: MIT
pragma solidity ^0.8.21;

import '@openzeppelin/contracts/utils/Strings.sol';
import 'hardhat/console.sol';

contract LibraryString {
  using Strings for uint256;

  function getString(uint256 _value) external pure returns (string memory) {
    console.log('getString Value: %s', _value.toHexString());
    return _value.toHexString();
  }

  function getString2(uint256 _value) external pure returns (string memory) {
    console.log('getString2 Value: %s', Strings.toHexString(_value));
    return Strings.toHexString(_value);
  }
}