// import { db } from "../lib/db.config";
// import { ethers } from "ethers";
// import { provider, contractAddress, adminWallet } from "../lib/ethers.config";
// import ApiError from "../utils/ApiError";
// import ContractABI from '../../contractABI.json';

// class TransactionService {
//     // public static async createWallet(payload: any) {
//     //     const { id } = payload;
//     //     const wallet = ethers.Wallet.createRandom();

//     //     // const encryptedPrivateKey = await wallet.encrypt(id);

//     //     return await db.account.update({
//     //         where: {
//     //             id: id
//     //         },
//     //         data: {
//     //             publicId: wallet.address,
//     //         }
//     //     })
//     // }
//     public static async createCase(payload: any) {
//         console.log("Args:Inside CreateCase Transaction", payload);
//         const { agencyId, caseId, userId } = payload;
//         const { contract } = await this.getWallet();

//         try {
//             // Set custom gas fees
//             const tx = await contract.createCase(caseId, userId, agencyId, {
//                 maxPriorityFeePerGas: ethers.utils.parseUnits('25', 'gwei'), // Minimum required tip
//                 maxFeePerGas: ethers.utils.parseUnits('50', 'gwei') // Adjust based on network conditions
//             });

//             const receipt = await tx.wait();
//             return { transactionHash: receipt.transactionHash };
//         } catch (err: any) {
//             console.log("Error", err);
//             throw new ApiError(500, err.message, {}, false);
//         }
//     }
    
//     public static async applyForCard(payload: any) {
//         const { cardId, agencyId, userId } = payload;
//         console.log("Args:Inside ApplyForCard", payload);
//         const { contract } = await this.getWallet();

//         try {
//             // Set custom gas fees
            
//             const tx = await contract.applyDigitalCard(cardId, agencyId, userId, {
//                 maxPriorityFeePerGas: ethers.utils.parseUnits('25', 'gwei'), // Minimum required tip
//                 maxFeePerGas: ethers.utils.parseUnits('50', 'gwei') // Adjust based on network conditions
//             });

//             const receipt = await tx.wait();
//             return { transactionHash: receipt.transactionHash };
//         } catch (err: any) {
//             console.log("Error", err);
//             throw new ApiError(500, err.message, {}, false);
//         }
//     }
//     public static async updateDigitalCard(payload: any) {
//         const { cardId, agencyId, status } = payload;
//         console.log("Args:Inside UpdateDigitalCard", payload);
//         const { contract } = await this.getWallet();

//         try {
//             // Set custom gas fees
//             const tx = await contract.updateDigitalCard(cardId, agencyId, status, {
//                 maxPriorityFeePerGas: ethers.utils.parseUnits('25', 'gwei'), // Minimum required tip
//                 maxFeePerGas: ethers.utils.parseUnits('50', 'gwei') // Adjust based on network conditions
//             });

//             const receipt = await tx.wait();
//             return { transactionHash: receipt.transactionHash };
//         } catch (err: any) {
//             console.log("Error", err);
//             throw new ApiError(500, err.message, {}, false);
//         }
//     }
//     public static async getCase(payload: any) {
//         const { caseId } = payload;
//         console.log("Args:Inside GetCase", payload);
//         const { contract } = await this.getWallet();

//         try {
//             const caseDetails = await contract.getCase(caseId);
//             return caseDetails;
//         } catch (err: any) {
//             console.log("Error", err);
//             throw new ApiError(500, err.message, {}, false);
//         }
//     }
//     public static async getDigitalCard(payload: any) {
//         const { cardId } = payload;
//         console.log("Args:Inside GetDigitalCard", payload);
//         const { contract } = await this.getWallet();

//         try {
//             const card = await contract.getDigitalCard(cardId);
//             return card;
//         } catch (err: any) {
//             console.log("Error", err);
//             throw new ApiError(500, err.message, {}, false);
//         }
//     }
//     public static async getDigitalCards(payload: any) {
//         const { agencyId } = payload
//         console.log("Args:Inside GetDigitalCards", payload);
//         const { contract } = await this.getWallet();
//         try {
//             const cards = await contract.getDigitalCards(agencyId);
//             return cards;
//         }
//         catch (err: any) {
//             console.log("Error", err);
//             throw new ApiError(500, err.message, {}, false);
//         }
//     }
//     public static async addEvidence(payload: any) {
//         const { caseId, accountId } = payload;
//         console.log("Args:Inside AddEvidence", payload);
//         const { contract } = await this.getWallet();
//         try {
//             const tx = await contract.addEvidence(caseId, accountId, {
//                 maxPriorityFeePerGas: ethers.utils.parseUnits('25', 'gwei'), // Minimum required tip
//                 maxFeePerGas: ethers.utils.parseUnits('50', 'gwei') // Adjust based on network conditions
//             });
//             const receipt = await tx.wait();
//             return { transactionHash: receipt.transactionHash };
//         }
//         catch (err: any) {
//             console.log("Error", err);
//             throw new ApiError(500, err.message, {}, false);
//         }
//     }
//     public static async requestCase(payload: any) {
//         const { caseId, agencyId } = payload;
//         console.log("Args:Inside RequestCase", payload);
//         const { contract } = await this.getWallet();
//         try {
//             const tx = await contract.requestCase(caseId, agencyId, {
//                 maxPriorityFeePerGas: ethers.utils.parseUnits('25', 'gwei'), // Minimum required tip
//                 maxFeePerGas: ethers.utils.parseUnits('50', 'gwei') // Adjust based on network conditions
//             });
//             const receipt = await tx.wait();
//             return { transactionHash: receipt.transactionHash };
//         }
//         catch (err: any) {
//             console.log("Error", err);
//             throw new ApiError(500, err.message, {}, false);
//         }
//     }

//     public static async updateRequestedCase(payload: any) {
//         const { caseId, requestedById, status, requestedToId } = payload;
//         console.log("Args:Inside UpdateRequestedCase", payload);
//         const { contract } = await this.getWallet();
//         try {
//             const tx = await contract.updateRequestedCase(caseId, requestedById, status, requestedToId, {
//                 maxPriorityFeePerGas: ethers.utils.parseUnits('25', 'gwei'), // Minimum required tip
//                 maxFeePerGas: ethers.utils.parseUnits('50', 'gwei') // Adjust based on network conditions
//             });
//             const receipt = await tx.wait();
//             return { transactionHash: receipt.transactionHash };
//         }
//         catch (err: any) {
//             console.log("Error", err);
//             throw new ApiError(500, err.message, {}, false);
//         }
//     }
//     public static async getRequestedCases(payload: any) {
//         const { accountId } = payload;
//         console.log("Args:Inside GetRequestedCases", payload);
//         const { contract } = await this.getWallet();
//         try {
//             const cases = await contract.getRequestedCases(accountId);
//             return cases;
//         }
//         catch (err: any) {
//             console.log("Error", err);
//             throw new ApiError(500, err.message, {}, false);
//         }
//     }
//     private static async getWallet() {

//         console.log("Th contract address", contractAddress, adminWallet.getBalance, adminWallet.address);
//         const contract = new ethers.Contract(contractAddress, ContractABI.abi, adminWallet);

//         return {
//             contract
//         };
//     }
// }

// export default TransactionService;
