// SPDX-License-Identifier: MIT
pragma solidity ^0.8.1;

contract MoodDiary {
    string mood;

    function setMood(string memory _mood) public {
        mood = _mood;
    }

    function setMood() public view returns (string memory) {
        return mood;
    }
}
