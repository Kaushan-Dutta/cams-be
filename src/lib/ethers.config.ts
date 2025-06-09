import { ethers } from "ethers";

const contractAddress = process.env.CONTRACT_ADDRESS || "";
const provider = new ethers.providers.JsonRpcProvider(process.env.RPC_URL || "");


const adminPrivateKey = process.env.ADMIN_PRIVATE_KEY || "";
const adminWallet = new ethers.Wallet(adminPrivateKey, provider);
console.log("Admin Wallet",adminPrivateKey,adminWallet.address);

export { contractAddress, provider, adminWallet };


