const { expect } = require('chai');
const { ethers } = require('hardhat');

describe('LibraryString', function () {
  async function deployLibraryStringFixture() {
    const LibraryString = await ethers.getContractFactory('LibraryString');
    const libraryString = await LibraryString.deploy();
    return { libraryString };
  }

  describe('Deployment', function () {
    it('Should deploy the contract', async function () {
      const { libraryString } = await deployLibraryStringFixture();
      expect(libraryString.address).to.not.equal(0);
    });
  });

  describe('Chechk libraryString', function () {
    it('getString Should check right', async function () {
      const { libraryString } = await deployLibraryStringFixture();
      expect(await libraryString.getString(1234)).to.equal('0x04d2');
    });
    it('getString2 Should check right', async function () {
      const { libraryString } = await deployLibraryStringFixture();
      expect(await libraryString.getString2(4321)).to.equal('0x10e1');
    });
  });
});
