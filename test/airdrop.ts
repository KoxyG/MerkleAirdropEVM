import {
  time,
  loadFixture,
} from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from 'chai';
import hre, { ethers }  from "hardhat";
import merkleTree from "merkletreejs";
const  keccak256 = require("keccak256");


describe("Merkle airdrop contract", function () {
  async function deployToken() {
    // Contracts are deployed using the first signer/account by default
    const [owner, otherAccount] = await hre.ethers.getSigners();

    const erc20Token = await hre.ethers.getContractFactory("MyERC20");
    const token = await erc20Token.deploy();

    return { token };
  }

  async function deployMerkleAirdrop() {
    // Contracts are deployed using the first signer/account by default

    const merkleRoot = "0x68b4bd58110a32d7272bac2f8ff5df8dfceacc355c9a07396961628c3d4e332b";
    const [owner, otherAccount] = await hre.ethers.getSigners();

    const { token } = await loadFixture(deployToken)

    const Merkleairdrop = await hre.ethers.getContractFactory("MerkleAirdrop");
    const MerkleAirdrop = await Merkleairdrop.deploy(token, merkleRoot);


    await token.transfer(MerkleAirdrop.getAddress(), ethers.parseUnits("10000", 18));

    return { MerkleAirdrop, owner, otherAccount, token };
  }

  describe("Deployment", function () {
    it("Should check if owner is correct", async function () {
      const { MerkleAirdrop, owner } = await loadFixture(deployMerkleAirdrop);

      expect(await MerkleAirdrop.owner()).to.equal(owner);
    });

    it("Deployment should assign the total supply of tokens to the owner", async function () {
      const [owner] = await ethers.getSigners();
  
      const { token  } = await loadFixture(deployToken);
  
      const ownerBalance = await token.balanceOf(owner.address);
      expect(await token.totalSupply()).to.equal(ownerBalance);
    });

    it("Deployment should Transfer the total supply from the owner to the contract", async function () {
      const [owner] = await ethers.getSigners();
  
      const { token } = await loadFixture(deployToken);
      const { MerkleAirdrop } = await loadFixture(deployMerkleAirdrop);

      const ownerBalance = await token.balanceOf(owner.address);
      const merkleBalance = await MerkleAirdrop.getContractBalance();
  
      expect(merkleBalance).to.equal( ethers.parseUnits("10000", 18));
    });

    it("Should check if the merkle root is correct", async function () {
      
      const merkleRoot = "0x68b4bd58110a32d7272bac2f8ff5df8dfceacc355c9a07396961628c3d4e332b";
      // merkleByte = ethers.utils.toUtf8Bytes(merkleRoot));
      // const merkleRootBytes32 = hre.ethers.utils.hexZeroPad(merkleRoot, 32);

      // console.log(merkleRootBytes32);
      const { MerkleAirdrop, owner } = await loadFixture(deployMerkleAirdrop);

      expect(await MerkleAirdrop.merkleRoot()).to.equal(merkleRoot);
    });

    it("Should check if the token address is correct", async function () {
      const { MerkleAirdrop, token } = await loadFixture(deployMerkleAirdrop);

      expect(await MerkleAirdrop.rewardToken()).to.equal(token);
    });

    it("Owner should withdraw", async function () {
      const { MerkleAirdrop, owner } = await loadFixture(deployMerkleAirdrop);
      const { token } = await loadFixture(deployToken);
    
      // Log initial balance of the owner before withdrawal
      const initialOwnerBalance = await token.balanceOf(owner.address);
      // console.log("Initial Owner Balance:", initialOwnerBalance.toString());
    
      // Owner withdraws 1000 tokens
      const withdrawAmount = ethers.parseUnits("1000", 18);
      await MerkleAirdrop.connect(owner).withdraw(withdrawAmount);
    
      // Check the owner's token balance after withdrawal
      const ownerBalance = await token.balanceOf(owner.address);
      // console.log("Owner Balance after withdrawal:", ownerBalance.toString());
    
      // Assert that the owner's balance increased by the withdraw amount
      expect(ownerBalance).to.equal(initialOwnerBalance); // Adding to the initial balance
    });

    // claim airdrop
    it("Should claim airdrop for qualified address", async function () {
      const { MerkleAirdrop, token, otherAccount } = await loadFixture(deployMerkleAirdrop);
     

      const claimAddress = "0xbe67D40727dcc8a38cA198509b827762cDaa3Fc7";
      
      const leaf = keccak256(ethers.solidityPacked(["address", "uint256"], [otherAccount, 15]));
      
      // const proof = merkleTree.default.bufferify([ 


      const amount = ethers.parseUnits("15", 18);

      const claim = await MerkleAirdrop.connect(otherAccount).claim(amount, claimAddress, proof);

      expect(MerkleAirdrop).to.emit(claim, "Claimed");
      expect(token.balanceOf(claimAddress)).to.equal(amount);
    });
    
    

    // it("updateMerkleRoot", async function () {
    //   const { MerkleAirdrop } = await loadFixture(deployMerkleAirdrop);

    //   const updateMerkleRoot = await MerkleAirdrop.updateMerkleRoot("0x511302a30fbffc89804cecbeaac285fd42525c99b5addcd79b4bb0fa252c3a56");
     
    //   expect(MerkleAirdrop).to.emit(updateMerkleRoot, "RootUpdated");

    // })

  });
});