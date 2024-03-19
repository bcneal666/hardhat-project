const {
  loadFixture,
} = require('@nomicfoundation/hardhat-toolbox/network-helpers');
const { expect } = require('chai');
const { ethers } = require('hardhat');

describe('Fallback', function () {
  async function deployFallbackFixture() {
    const ethValue = ethers.parseEther('1');
    const [owner, otherAccount] = await ethers.getSigners();
    const Fallback = await ethers.getContractFactory('Fallback');
    const fallback = await Fallback.deploy({ value: ethValue });
    return { fallback, ethValue, owner, otherAccount };
  }

  describe('Deployment', function () {
    it('Should set the right owner', async function () {
      const { fallback, owner } = await loadFixture(deployFallbackFixture);
      expect(await fallback.owner()).to.equal(owner.address);
    });

    it('Should receive and store the funds', async function () {
      const { fallback, ethValue } = await loadFixture(deployFallbackFixture);
      expect(await ethers.provider.getBalance(fallback.target)).to.equal(
        ethValue
      );
      // expect(await fallback.getBalance()).to.equal(ethValue);
    });
  });

  describe('fallback and receive', function () {
    it('Should trigger receive() when sending Ether without data', async function () {
      const { fallback, ethValue, otherAccount } = await loadFixture(
        deployFallbackFixture
      );
      expect(
        await otherAccount.sendTransaction({
          to: fallback.target,
          value: ethValue,
        })
      )
        .to.emit(fallback, 'Received')
        .withArgs(otherAccount.address, ethValue);
    });

    it('Should trigger fallback() when sending Ether with data', async function () {
      const { fallback, ethValue, otherAccount } = await loadFixture(
        deployFallbackFixture
      );
      const data = '0x1234';
      await expect(
        otherAccount.sendTransaction({
          to: fallback.target,
          value: ethValue,
          data,
        })
      )
        .to.emit(fallback, 'fallbacked')
        .withArgs(otherAccount.address, ethValue, data);
    });
  });
});
