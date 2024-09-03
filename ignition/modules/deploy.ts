import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const tokenName = "KOXY";
const tokenSymbol = "KXY";
const merkleRoot = "0x1234...";


const MerkleAirdropModule = buildModule("MerkleAirdrop", (m) => {

    const airdrop = m.contract("MerkleAirdrop", [tokenName, tokenSymbol, merkleRoot]);

    return { airdrop };
});

export default MerkleAirdropModule;