// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract WhitelistDapp {
    uint8 public maxWhitelistedAddresses;
    mapping(address => bool) public whitelistedAddresses;
    uint8 public numAddressesWhitelisted;

    constructor(uint8 _maxWhitelistAddresses) {
        maxWhitelistedAddresses = _maxWhitelistAddresses;
    }

    function addAddressToWhitelist() external {
        require(
            !whitelistedAddresses[msg.sender],
            "Address already whitelisted!"
        );
        require(
            maxWhitelistedAddresses > numAddressesWhitelisted,
            "Maximum number of addresses have already been whitelisted. No more addresses can be whitelisted now!"
        );

        whitelistedAddresses[msg.sender] = true;
        numAddressesWhitelisted++;
    }
}
