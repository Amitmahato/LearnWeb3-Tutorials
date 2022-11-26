import { ethers } from "hardhat";

async function main() {
  const MAX_WHITELIST_ADDRESSES = 10;
  const WhitelistDapp = await ethers.getContractFactory("WhitelistDapp");
  const whitelistDapp = await WhitelistDapp.deploy(MAX_WHITELIST_ADDRESSES);

  await whitelistDapp.deployed();

  console.log(
    `WhitelistDapp with maximum of ${MAX_WHITELIST_ADDRESSES} addresses to be whitelisted deployed to ${whitelistDapp.address}`
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
