import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const tokenAddress = "0x4dBCD8721e025EE11B8b1Fa4991dA993e202A0b5";
const merkleRoot = "0x511302a30fbffc89804cecbeaac285fd42525c99b5addcd79b4bb0fa252c3a56";


const MerkleAirdropModule = buildModule("MerkleAirdrop", (m) => {

    const airdrop = m.contract("MerkleAirdrop", [tokenAddress, merkleRoot]);
    return { airdrop };
});

export default MerkleAirdropModule;