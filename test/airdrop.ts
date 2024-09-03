import {
  time,
  loadFixture,
} from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import {hre} from "hardhat";


describe("SaveERC20", function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  async function deployToken() {
    // Contracts are deployed using the first signer/account by default
    const [owner, otherAccount] = await hre.ethers.getSigners();

    const erc20Token = await hre.ethers.getContractFactory("Web3CXI");
    const token = await erc20Token.deploy();

    return { token };
  }

  async function deploySaveERC20() {
    // Contracts are deployed using the first signer/account by default
    const [owner, otherAccount] = await hre.ethers.getSigners();

    const { token } = await loadFixture(deployToken)

    const saveERC20 = await hre.ethers.getContractFactory("SaveERC20");
    const saveErc20 = await saveERC20.deploy(token);

    return { saveErc20, owner, otherAccount, token };
  }

  describe("Deployment", function () {
    it("Should check if owner is correct", async function () {
      const { saveErc20, owner } = await loadFixture(deploySaveERC20);

      expect(await saveErc20.owner()).to.equal(owner);
    });

    it("Should check if tokenAddress is correctly set", async function () {
      const { saveErc20, owner, token } = await loadFixture(deploySaveERC20);

      expect(await saveErc20.tokenAddress()).to.equal(token);
    });
  });

 


});