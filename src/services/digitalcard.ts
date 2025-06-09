import { db } from "../lib/db.config";

class DigitalCardService {
    public static async applyDigitalCard(payload: any) {
        console.log("Args:Inside CreateDigitalCard", payload);
        // return await db.digitalCard.create({
        //     data: {
        //         id: payload.id,
        //         locationId: payload.locationId,
        //         ...payload
                
        //     }
        // }) 
        // const agencyId = await db.location.findUnique({
        //     where: {
        //         pincode: payload.pincode
        //     }
        // })
        // console.log("AgencyId", agencyId);
        // return { cardId, agencyId };
        return {}


    }
    public static async getDigitalCard(id:string) {
        console.log("Args:Inside GetDigitalCard", id);
        return db.digitalCard.findUnique({
            where: {
                id: id
            }
        });
    }
}
export default DigitalCardService