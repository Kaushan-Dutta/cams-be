import { db } from "../lib/db.config";
class CaseService {
    public static getCase(payload: any) {
        const { id } = payload;
        console.log("Args:Inside", id);
        return db.caseAgencyMap.findFirst({
            where: {
                caseId: id
            },
            include: {
                case: {
                    include: {
                        evidence: true,
                        account: true
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
    public static async updateEvidence(payload: any) {
        console.log("Args:Inside", payload);

        try {
            for (let i = 0; i < payload.data.length; i++) {

                await db.evidence.create({
                    data: {
                        caseId: payload.caseId,
                        ...payload.data[i]
                    }
                })


            }
        }
        catch (e) {
            console.log(e)
            throw new Error("Error updating evidence")
        }
    }
}
export default CaseService
