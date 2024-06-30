
## Overview

This project is a simple reservation system built on Ethereum blockchain. It includes both a smart contract written in Solidity and a frontend developed using Next.js. Users can make or cancel reservations, and the status of the reservation is updated both on the blockchain and displayed dynamically on the frontend.

## Features

- Dynamic background on the frontend
- Two major functions in the smart contract:
  1. Make Reservation
  2. Cancel Reservation
- Integration with MetaMask wallet for transactions
- Reservation status displayed on the frontend

## Installation and Setup

### Prerequisites

- Node.js and npm installed
- MetaMask extension added to your browser

### Installation Steps

1. Clone the GitHub repository to your local machine.
2. Navigate to the project directory and run `npm i` to install dependencies.
3. Open three terminal instances.

#### Terminal 1



```bash
npm i
```

#### Terminal 2

Run the Hardhat node.

```bash
npx hardhat compile
npx hardhat node
```

#### Terminal 3

Deploy the smart contract.

```bash
npx hardhat run --network localhost scripts/deploy.js
```

#### Terminal 1

Go to terminal 1 again and Run the Next.js development server.

```bash
npm run dev
```

4. Open your browser and go to `http://localhost:3000` to interact with the application.
5. Connect your MetaMask wallet when prompted.

## Troubleshooting

- If you encounter issues with contract address, make sure to update the `.env.local` with the correct contract address.
- For any styling issues, ensure that the `styles/styles.css` file is properly linked.
