import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const tokenName = "KOXY";
const tokenSymbol = "KXY";
const merkleRoot = "0x511302a30fbffc89804cecbeaac285fd42525c99b5addcd79b4bb0fa252c3a56";


const MerkleAirdropModule = buildModule("MerkleAirdrop", (m) => {

    const airdrop = m.contract("MerkleAirdrop", [tokenName, tokenSymbol, merkleRoot]);
    return { airdrop };
});

export default MerkleAirdropModule;