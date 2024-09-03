# MerkleAirdropEVM

MerkleAirdropEVM is an Ethereum-based airdrop mechanism utilizing a Merkle tree to ensure secure and efficient distribution of tokens on the lisk blockchain. The project includes a script to generate random CSV files containing addresses and token amounts, which are used for the airdrop.

## Features

- **Merkle Tree Implementation**: Utilizes a Merkle tree to verify the inclusion of an address in the airdrop, enhancing security.
- **Random CSV Generation**: Easily generate random addresses and corresponding amounts for the airdrop.
- **Data Storage**: Automatically saves the generated CSV files in the specified directory.

## Prerequisites

- **Node.js**: Ensure that you have Node.js installed.
- **Hardhat**: This project uses Hardhat, a development environment for Ethereum-based smart contracts.

## Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/MerkleAirdropEVM.git
cd MerkleAirdropEVM
```

2. Install dependencies:

```bash
npm install
```

## Usage

1. Generate Random CSV:

- You can generate a random CSV file containing Ethereum addresses and token amounts by running the following command:

```bash
npx hardhat run scripts/generateCSV.ts --network lisk-sepolia
```
This will generate a CSV file with random data saved as csvFile.csv and save it in the scripts/Data folder.

2. Merkle Tree Airdrop script:

- Once the CSV file is generated, you can proceed with running the merklejs script by running the following command.

```bash
npx hardhat run scripts/merkle.ts --network lisk-sepolia
```
3. Deploy the Merkle Airdrop contract:

- Deploy the token contract first  by using this command:

```bash
npx hardhat ignition deploy ignition/modules/MyERC20.ts --network lisk-sepolia
```
After deploying the token contract, saved the address somewhere for it will be used to deploy the merkle contract. 
PS: Make sure you change the tokenAddress and the merkleRoot address in the deploy script!.

- Deploy thr Merkle contract by using this command:
```bash
npx hardhat ignition deploy ignition/modules/merkle.ts --network lisk-sepolia
```

Running this script will generate the merkleTree.json file, addressData.json file and also output the merkleRoot in your console.

## Folder Structure
- contracts/: Contains the smart contracts for the Merkle airdrop.
- scripts/: Contains the script to generate the random CSV files.
- scripts/Data/: The directory where the generated CSV files are saved.
- test/: Contains test cases for the smart contracts.

## Merkle Root & Token Address
- Merkle Root: `0x511302a30fbffc89804cecbeaac285fd42525c99b5addcd79b4bb0fa252c3a56`
- Token Address: `0x4dBCD8721e025EE11B8b1Fa4991dA993e202A0b5`
