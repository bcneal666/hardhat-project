const { expect } = require('chai');
const { ethers } = require('hardhat');

describe('Mapping', function () {
  async function deployMappingFixture() {
    const Mapping = await ethers.getContractFactory('Mapping');
    const mapping = await Mapping.deploy();
    return { mapping };
  }

  describe('Deployment', function () {
    it('Should deploy the contract', async function () {
      const { mapping } = await deployMappingFixture();
      expect(mapping.address).to.not.equal(0);
    });
  });

  describe('Chechk mapping', function () {
    it('idToAddr Should set the value', async function () {
      const { mapping } = await deployMappingFixture();
      testId = 1;
      const testAddr = '0xC49339D6b5137F71Cd2cCc421f3d243CF44071F1';
      await mapping.writeMap(testId, testAddr);
      expect(await mapping.idToAddr(testId)).to.equal(testAddr);
    });
    it('swapPair should set the value', async function () {
      const { mapping } = await deployMappingFixture();
      testaddr = '0xC49339D6b5137F71Cd2cCc421f3d243CF44071F1';
      testaddr2 = '0xC49339D6b5137F71Cd2cCc421f3d243CF44071F1';
      await mapping.writeSwapPair(testaddr, testaddr2);
      expect(await mapping.readSwapPair(testaddr)).to.equal(testaddr2);
    })
  });
});
