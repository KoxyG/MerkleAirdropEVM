// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;

import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/utils/cryptography/MerkleProof.sol";

contract MerkleAirdrop is ERC20 {
     
    bytes32 public immutable merkleRoot;
    mapping(address => bool) public hasClaimed;

    // errors 
    error AlreadyClaimed();
    error NotInMerkle();

    // events
    event Claim(address indexed to, uint256 amount);

    constructor(string memory _name, string memory _symbol, bytes32 _merkleRoot) ERC20(_name, _symbol) {
        merkleRoot = _merkleRoot;
    }

    function claim(uint256 _amount, bytes32[] calldata proof) external returns (bool success) {
        if (hasClaimed[msg.sender]) revert AlreadyClaimed();

        bytes32 leaf = keccak256(abi.encodePacked(msg.sender, _amount));
        // Verify merkle proof, or revert if not in tree
        bool isValidLeaf = MerkleProof.verify(proof, merkleRoot, leaf);

        if (!isValidLeaf) revert NotInMerkle();

        hasClaimed[msg.sender] = true;
        _mint(msg.sender, _amount);

        // Emit claim event
        emit Claim(msg.sender, _amount);

        return true;
    }
}
