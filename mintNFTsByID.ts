// import { getDefaultProvider, Wallet, utils } from 'ethers'; // ethers v5
// import { Provider, TransactionResponse } from '@ethersproject/providers'; // ethers v5
// import { ERC721Client } from '@imtbl/contracts';

// const CONTRACT_ADDRESS = '0x0f0c2fe45fb30685aee04929a67e1ae709f0cbf6';
// const PRIVATE_KEY = 'ac08135490aec8493a27189318d41e99e5cae2df2c1956ed1b85ed6fa8a2ece0';
// const TOKEN_ID1 = 1;
// const TOKEN_ID2 = 2;
// const TOKEN_ID3 = 3;

// const provider = getDefaultProvider('https://rpc.testnet.immutable.com');

// const mint = async (provider: Provider): Promise<TransactionResponse> => {
//   // Bound contract instance
//   const contract = new ERC721Client(CONTRACT_ADDRESS);
//   // The wallet of the intended signer of the mint request
//   const wallet = new Wallet(PRIVATE_KEY, provider);
//   const minterRole = await contract.MINTER_ROLE(provider);
//   const hasMinterRole = await contract.hasRole(
//     provider,
//     minterRole,
//     wallet.address
//   );

//   if (!hasMinterRole) {
//     // Handle scenario without permissions...
//     console.log('Account doesnt have permissions to mint.');
//     return Promise.reject(
//       new Error('Account doesnt have permissions to mint.')
//     );
//   }

//   // Construct the mint requests
//   const requests = [
//     {
//       to: '0x52B1aDEfc8405EF40F9bA32a21d76E739e8d6e62',
//       tokenIds: [TOKEN_ID1, TOKEN_ID2, TOKEN_ID3],
//     }
//   ];
// const currentGasPrice = await provider.getGasPrice();
  
//   // Optionally increase the gas price to ensure the transaction goes through
//   const adjustedGasPrice = currentGasPrice.add(utils.parseUnits('10', 'gwei'));

//   const populatedTransaction = await contract.populateMintBatch(requests);
//   populatedTransaction.gasPrice = adjustedGasPrice;
//   const result = await wallet.sendTransaction(populatedTransaction);
//   console.log(result); // To get the TransactionResponse value
//   return result;
// };

// mint(provider);

import { getDefaultProvider, Wallet, utils } from "ethers"; // ethers v5
import { Provider, TransactionResponse } from "@ethersproject/providers"; // ethers v5
import { ERC721Client } from "@imtbl/contracts";

const CONTRACT_ADDRESS = "0x0f0c2fe45fb30685aee04929a67e1ae709f0cbf6";
const PRIVATE_KEY =
  "ac08135490aec8493a27189318d41e99e5cae2df2c1956ed1b85ed6fa8a2ece0";
const TOKEN_ID1 = 1;
const TOKEN_ID2 = 2;
const TOKEN_ID3 = 3;

const provider = getDefaultProvider("https://rpc.testnet.immutable.com");

const mint = async (provider: Provider): Promise<TransactionResponse> => {
    // Bound contract instance
  const contract = new ERC721Client(CONTRACT_ADDRESS);
  console.log('Contract instance created with address:', CONTRACT_ADDRESS);

  // The wallet of the intended signer of the mint request
  const wallet = new Wallet(PRIVATE_KEY, provider);

  const requests = [
    {
      to: "0x52B1aDEfc8405EF40F9bA32a21d76E739e8d6e62",
      tokenIds: [TOKEN_ID1, TOKEN_ID2, TOKEN_ID3],
    },
    ];

  const gasOverrides = {
    maxPriorityFeePerGas: 100e9, // 100 Gwei
    maxFeePerGas: 150e9,
    gasLimit: 200000,
    };

  const populatedTransaction = await contract.populateMintBatch(requests, gasOverrides);

  const result = await wallet.sendTransaction(populatedTransaction);
  console.log("Transaction sent, result:", result); // To get the TransactionResponse value
  return result;
};

mint(provider);