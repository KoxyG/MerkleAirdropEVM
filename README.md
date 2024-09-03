# MerkleAirdropEVM

MerkleAirdropEVM is an Ethereum-based airdrop mechanism utilizing a Merkle tree to ensure secure and efficient distribution of tokens. The project includes a script to generate random CSV files containing addresses and token amounts, which are used for the airdrop.

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