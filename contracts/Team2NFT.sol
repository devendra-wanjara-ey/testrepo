// SPDX-License-Identifier: GPL-3.0
// Devendra Wanjara 
pragma solidity >=0.5.16;

//import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
//import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

contract Team2NFT is ERC721Enumerable {
    constructor() ERC721("Team2NFT", "T2NFT") {}

    function mint() public {
        _mint(msg.sender, totalSupply());
    }

    function tokenURI(uint256 tokenId)
        public
        pure
        override
        returns (string memory)
    {
        return
            string(
                abi.encodePacked(
                    "https://raw.githubusercontent.com/devendra-wanjara-ey/testrepo/main/assets/Team2NFT_",
                    Strings.toString(tokenId),
                    ".json"
                )
            );
    }
}
