import { db } from "../lib/db.config";
class AlertService {
    public static getAlerts(payload:any) {
        const { agencyId } = payload;
        console.log("Args:Inside GetAlerts", payload);
        return db.alert.findMany({
            where: {
                agencyId: agencyId
            }
        })
    }
    public static async postAlert(payload:any) {
        const { latitude, longitude } = payload
        console.log("Args:Inside PostAlert",payload);
        const agencies = await db.location.findMany();

        let agencyId = null;
        let minDistance = 100000;
        
        agencies.forEach(agency => {
            console.log(agency)
            const distance = Math.abs(latitude - agency.latitude) + Math.abs(longitude - agency.longitude);
            if (distance < minDistance) {
                minDistance = distance;
                agencyId = agency.accountId;
            }
        })
        console.log(agencyId)
        if(agencyId === null) {
            throw new Error("No agency found")
        }
        return await db.alert.create({
            data: {
                latitude: parseFloat(latitude),
                longitude: parseFloat(longitude),
                agencyId: agencyId
            }
        })
    }
}
export default AlertService
