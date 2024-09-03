// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;

import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/utils/cryptography/MerkleProof.sol";

import "./IERC20.sol";


contract MerkleAirdrop is ERC20 {
     
    bytes32 public merkleRoot;
    mapping(address => bool) public hasClaimed;
    address public owner;

    // errors 
    error AlreadyClaimed();
    error NotInMerkle();
    error NotOwner();
    error NotEnoughBalance();
    

    // events
    event Claim(address indexed to, uint256 amount);
    event OwnerWithdraw(address indexed to, uint256 amount);
    event RootUpdated(address);

    
    IERC20 public rewardToken;

    constructor(address _rewardToken, bytes32 _merkleRoot) {
        merkleRoot = _merkleRoot;
        owner = msg.sender;
        rewardToken = IERC20(_rewardToken);
    }

    function claim(uint256 _amount, bytes32[] calldata proof) external returns (bool success) {
        if (hasClaimed[msg.sender]) revert AlreadyClaimed();

        bytes32 leaf = keccak256(abi.encodePacked(msg.sender, _amount));
        // Verify merkle proof, or revert if not in tree
        bool isValidLeaf = MerkleProof.verify(proof, merkleRoot, leaf);

        if (!isValidLeaf) revert NotInMerkle();

        hasClaimed[msg.sender] = true;
        rewardToken.transfer(msg.sender, amount);

        // Emit claim event
        emit Claim(msg.sender, _amount);

        return true;
    }

    function withdraw(uint256 amount) external {
        if (msg.sender != owner) revert NotOwner();

        // Ensure the contract has enough tokens to withdraw
        uint256 contractBalance = balanceOf(address(this));    
        if (contractBalance <= amount) revert NotEnoughBalance();

        // Transfer the tokens to the owner
        rewardToken.transfer(msg.sender, amount);

        // Emit withdraw event
        emit OwnerWithdraw(msg.sender, amount);
    }

    function updateMerkleRoot(bytes32 _merkleRoot) external returns (bool success) {
        if (msg.sender != owner) revert NotOwner();
        
        merkleRoot = _merkleRoot;

        return true;
    }

}
