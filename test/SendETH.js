const {
  loadFixture,
} = require('@nomicfoundation/hardhat-toolbox/network-helpers');
const { expect } = require('chai');
const { ethers } = require('hardhat');
const { testLog } = require('../utils/common');

describe('SendETH', function () {
  async function deploySendETHFixture() {
    const ethValue = ethers.parseEther('10');
    const sendValue = ethers.parseEther('1');
    const [owner, otherAccount] = await ethers.getSigners();
    const SendETH = await ethers.getContractFactory('SendETH');
    const sendETH = await SendETH.deploy({ value: ethValue });
    return { sendETH, sendValue, owner, otherAccount, ethValue };
  }

  describe('Deployment', function () {
    it('Should set right owner for sendETH', async function () {
      const { sendETH, owner } = await loadFixture(deploySendETHFixture);
      expect(await sendETH.owner()).to.equal(owner.address);
    });
    it('Should store the funds', async function () {
      const { sendETH, ethValue } = await loadFixture(deploySendETHFixture);
      expect(await ethers.provider.getBalance(sendETH.target)).to.equal(
        ethValue
      );
    });
    it('Fallback has address', async function () {
      const { sendETH } = await loadFixture(deploySendETHFixture);
      const fallbackAddr = await sendETH.fallbackFn();
      expect(fallbackAddr).to.not.equal(0);
      testLog('fallbackFn address:', fallbackAddr);
    });
  });

  describe('sendETH', function () {
    it('Should send ETH to fallback', async function () {
      const { sendETH, sendValue } = await loadFixture(deploySendETHFixture);
      await sendETH.sendETH(sendETH.fallbackFn(), sendValue);
      // const balance = await ethers.provider.getBalance(sendETH.fallbackFn());
      // const bEther = ethers.formatEther(balance);
      const sEther = ethers.formatEther(sendValue);
      // console.log('sendETH.fallbackFn() balance:', bEther);
      console.log('      send ETH:', sEther);
      expect(await ethers.provider.getBalance(sendETH.fallbackFn())).to.equal(
        sendValue
      );
    });
    it('Should transer ETH to fallback', async function () {
      const { sendETH, sendValue } = await loadFixture(deploySendETHFixture);
      await sendETH.transferETH(sendETH.fallbackFn(), sendValue);
      expect(await ethers.provider.getBalance(sendETH.fallbackFn())).to.equal(
        sendValue
      );
    });
    it('Should call ETH to fallback', async function () {
      const { sendETH, sendValue } = await loadFixture(deploySendETHFixture);
      await sendETH.callETH(sendETH.fallbackFn(), sendValue);
      expect(await ethers.provider.getBalance(sendETH.fallbackFn())).to.equal(
        sendValue
      );
    });
  });
});
