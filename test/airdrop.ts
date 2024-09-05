import {
  time,
  loadFixture,
} from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from 'chai';
import hre, { ethers }  from "hardhat";


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

    const merkleRoot = "0x511302a30fbffc89804cecbeaac285fd42525c99b5addcd79b4bb0fa252c3a56";
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
      const merkleRoot = "0x511302a30fbffc89804cecbeaac285fd42525c99b5addcd79b4bb0fa252c3a56";
      const { MerkleAirdrop, owner } = await loadFixture(deployMerkleAirdrop);

      expect(await MerkleAirdrop.merkleRoot()).to.equal(merkleRoot);
    });

    it("Should check if the token address is correct", async function () {
      const { MerkleAirdrop, token } = await loadFixture(deployMerkleAirdrop);

      expect(await MerkleAirdrop.rewardToken()).to.equal(token);
    });

    it("Owner should withdraw balance tokens", async function () {
      
      const { MerkleAirdrop, owner } = await loadFixture(deployMerkleAirdrop);
      const { token  } = await loadFixture(deployToken);

      const contractBalance = await MerkleAirdrop.getContractBalance();

      const withdraw = await MerkleAirdrop.withdraw(ethers.parseUnits(contractBalance.toString(), 18));
      const ownerBalance = await token.balanceOf(owner.address);
     

      expect(ownerBalance).to.equal(contractBalance);
    });

    it("updateMerkleRoot", async function () {
      const { MerkleAirdrop } = await loadFixture(deployMerkleAirdrop);

      const updateMerkleRoot = await MerkleAirdrop.updateMerkleRoot("0x511302a30fbffc89804cecbeaac285fd42525c99b5addcd79b4bb0fa252c3a56");
     
      expect(MerkleAirdrop).to.emit(updateMerkleRoot, "RootUpdated");

    })

  });
});