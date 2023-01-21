// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/Team2NFTV1.sol";


contract TestTeam2NFTV1 {
    
    function testNFT () public {       
        Team2NFTV1 sc = Team2NFTV1(DeployedAddresses.Team2NFTV1());
        uint256 ts = sc.getTotalSupply();
        console.log(sc);
        Assert.equal(ts, 0, "Total Supply Should be Zero");
    }

}