import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { expect } from "chai";
import { ethers } from "hardhat";

describe("WhitelistDapp", function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  async function deployTwoWhitelistedAddressesFixture() {
    const MAX_WHITELIST_ADDRESSES = 2;

    // Contracts are deployed using the first signer/account by default
    const [owner, account1, account2] = await ethers.getSigners();

    const WhitelistDapp = await ethers.getContractFactory("WhitelistDapp");
    const whitelistDapp = await WhitelistDapp.deploy(MAX_WHITELIST_ADDRESSES);

    return {
      whitelistDapp,
      owner,
      account1,
      account2,
      MAX_WHITELIST_ADDRESSES,
    };
  }

  describe("Deployment", function () {
    it("Should have 0 already whitelisted addresses", async function () {
      const { whitelistDapp } = await loadFixture(
        deployTwoWhitelistedAddressesFixture
      );

      expect(await whitelistDapp.numAddressesWhitelisted()).to.equal(0);
    });
  });

  describe("Whitelist Both Addresses & Validate", function () {
    it("Should set first & second address as whitelisted, fail if tried to addAddressToWhitelist again and addAddressToWhitelist not more than specified count", async function () {
      const { whitelistDapp, owner, account1, account2 } = await loadFixture(
        deployTwoWhitelistedAddressesFixture
      );

      await whitelistDapp.connect(owner).addAddressToWhitelist();
      expect(await whitelistDapp.numAddressesWhitelisted()).to.equal(1);
      await expect(
        whitelistDapp.connect(owner).addAddressToWhitelist()
      ).to.be.revertedWith("Address already whitelisted!");

      await whitelistDapp.connect(account1).addAddressToWhitelist();
      expect(await whitelistDapp.numAddressesWhitelisted()).to.equal(2);
      await expect(
        whitelistDapp.connect(account1).addAddressToWhitelist()
      ).to.be.revertedWith("Address already whitelisted!");

      await expect(
        whitelistDapp.connect(account2).addAddressToWhitelist()
      ).to.be.revertedWith(
        "Maximum number of addresses have already been whitelisted. No more addresses can be whitelisted now!"
      );
    });
  });
});
