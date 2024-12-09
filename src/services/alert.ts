import { db } from "../lib/db.config";
import AgencyService from "./agency";
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
        const agencyId=await AgencyService.getNearestAgency({latitude,longitude});

        return await db.alert.create({
            data: {
                latitude: parseFloat(latitude),
                longitude: parseFloat(longitude),
                agencyId: agencyId
            }
        })
    }
    public static updateAlert(payload:any) {
        const { id, status } = payload
        console.log("Args:Inside UpdateAlert", payload);
        return db.alert.update({
            where: { id: id },
            data: { status: status },
        })
    }

}
export default AlertService
