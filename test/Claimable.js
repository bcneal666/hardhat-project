const { loadFixture } = require('@nomicfoundation/hardhat-toolbox/network-helpers');
const { expect } = require('chai');
const { ethers } = require('hardhat');

describe('Claimable', function () {
  async function deployClaimableFixture() {
    const [owner, otherAccount] = await ethers.getSigners();
    const Claimable = await ethers.getContractFactory('Claimable');
    const claimable = await Claimable.deploy();
    return { claimable, owner, otherAccount };
  }

  describe('Deployment', function () {
    it('Should set the right owner', async function () {
      const { claimable, owner } = await loadFixture(deployClaimableFixture);
      expect(await claimable.owner()).to.equal(owner.address);
    });
  });

  describe('claim', function () {
    it('Should not allow non-owner to claim funds', async function () {
      const { claimable, otherAccount } = await loadFixture(deployClaimableFixture);

      const bal = await ethers.provider.getBalance(otherAccount.address);

      // Send some ether to the contract
      await otherAccount.sendTransaction({
        to: claimable,
        value: ethers.parseEther("1"),
      });

      // Try to call the claim function as otherAccount
      await expect(claimable.connect(otherAccount).claim()).to.be.revertedWith(
        'Not enough balance to claim'
      );
    });
  });

  describe('withdrawAll', function () {
    it('Should allow the owner to withdraw funds', async function () {
      const { claimable, owner } = await loadFixture(deployClaimableFixture);

      // Send some ether to the contract
      await owner.sendTransaction({
        to: claimable.address,
        value: ethers.parseEther("1.0"),
      });

      // Withdraw the funds as the owner
      await expect(() => claimable.connect(owner).withdrawAll()).to.changeEtherBalances(
        [owner, claimable],
        [ethers.parseEther("1.0"), ethers.parseEther("-1.0")]
      );
    });
  });
});
