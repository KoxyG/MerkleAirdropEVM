// import {
//   time,
//   loadFixture,
// } from "@nomicfoundation/hardhat-toolbox/network-helpers";
// import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
const { ethers } = require("hardhat");
const { expect } = require("chai");

describe("Token contract", function () {
  it("Deployment should assign the total supply of tokens to the owner", async function () {
    const [owner] = await ethers.getSigners();

    const Token = await ethers.deployContract("MyERC20");

    const ownerBalance = await Token.balanceOf(owner.address);
    expect(await Token.totalSupply()).to.equal(ownerBalance);
  });
});