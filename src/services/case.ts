import { db } from "../lib/db.config";
import { caseIdGenerator } from "../utils";

class CaseService {
    public static getCase(payload: any) {
        const { id } = payload;
        console.log("Args:Inside Get Case", payload);
        return db.caseAgencyMap.findUnique({
            where: {
                caseId: id
            },
            include: {
                case: {
                    include: {
                        evidence: true,
                        participant: true,
                        location: true
                    }
                },
                agency: {
                    select: {
                        id: true,
                        name: true
                    }
                }
            }
        });
    }
    // public static async updateEvidence(payload: any) {
    //     console.log("Args:Inside UpdateEvidence", payload);

    //     try {
    //         for (let i = 0; i < payload.data.length; i++) {

    //             await db.evidence.create({
    //                 data: {
    //                     caseId: payload.caseId,
    //                     ...payload.data[i]
    //                 }
    //             })


    //         }
    //         return true
    //     }
    //     catch (e) {
    //         console.log(e)
    //         throw new Error("Error updating evidence")
    //     }
    // }
    public static async caseRegister(payload: any) {
        console.log("Args:Inside CaseRegister", payload);
        const { reporter } = payload
        const caseId = await caseIdGenerator();
        const formattedDate = new Date(payload.dateOfIncident).toISOString();

        return db.caseApplication.create({
            data: {
                id: caseId,
                reporter: reporter,
                type: payload.type,
                title:payload.title,
                description: payload.description,
                dateOfIncident: formattedDate,
                locationId: payload.locationId,
            }
        })
    }
    public static async mapCaseAgency(payload:any) {
        console.log("Args:Inside MapCaseAgency", payload);
        const { caseId, agencyId } = payload

        return db.caseAgencyMap.create({
            data: {
                agencyId: agencyId,
                caseId: caseId,
            }
        })



    }
    public static async updateCaseEvidence(payload:any) {
        console.log("Args:Inside UpdateCaseEvidence", payload);
        const { caseId, evidence } = payload
        for (let i = 0; i < evidence.length; i++) {
            await db.evidence.create({
                data: {
                    caseId,
                    ...evidence[i],
                }
            })
        }
    }
    public static async updateCaseParticipant(payload:any) {
        console.log("Args:Inside UpdateCaseParticipant", payload);
        const { caseId, participant } = payload
        for (let i = 0; i < participant.length; i++) {
            await db.caseParticipant.create({
                data: {
                    caseId,
                    ...participant[i],
                }
            })
        }
    }
    public static async getComplainerId(payload:any){
        const {caseId}=payload;
        console.log("Args:Inside GetComplainerId",payload);
        return await db.caseParticipant.findFirst({
            where:{
                caseId:caseId,
                type:'COMPLAINANT'
            },
            select:{
                accountId:true
            }
        })
    }
    
}
export default CaseService
