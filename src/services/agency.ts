//@ts-nocheck
import { db } from "../lib/db.config";

class AgencyService {
    public static agencyRegister(payload) {
        const { email, name, phone, document, pincode, latitude, longitude, sate } = payload
        console.log("Args:Inside", payload);
        return db.agencyApplication.create({
            data: {
                ...payload
            },
        })

    }
    public static getAgencyFromPincode(payload) {
        const { pincode } = payload
        return db.location.findFirst({
            where: { pincode: pincode },
        });
    }

    public static updateAlert(payload) {
        const { id, status } = payload
        console.log("Args:Inside", id, status);
        return db.alert.update({
            where: { id: id },
            data: { status: status },
        })
    }

    public static updateCaseStatus(payload) {
        console.log("Args:Inside", payload);
        const { id, status } = payload
        console.log(id, status);
        return db.caseApplication.update({
            where: { id: id },
            data: { status: status },
        })
    }
    public static getAgencyCases(payload) {
        console.log("Args:Inside", payload);
        const { agencyId } = payload
        return db.caseAgencyMap.findMany({
            where: {
                agencyId: agencyId,
            },
            select: {
                case: true
            }
        })

    }
    public static getAgencyCaseMap(payload) {
        console.log("Args:Inside", payload);
        const { agencyId, caseId } = payload
        return db.caseAgencyMap.findFirst({
            where: {
                AND: [
                    { agencyId: agencyId },
                    { caseId: caseId }
                ]
            },
            include: {
                agency: {
                    select: {
                        name: true
                    }
                },
            }

        })

    }
    public static updateCaseEvidence(payload) {
        return { message: "Case Evidence Updated" }
    }
}
export default AgencyService