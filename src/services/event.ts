import { db } from "../lib/db.config";
class EventService {
    public static getEvent(payload: any) {
        const { id } = payload;
        console.log("Args:Inside GetEvent", payload);
        return db.event.findUnique({
            where: {
                id: id
            },
            include:{
                location:true
            }
        });
    }
    public static createEvent(payload: any) {
        console.log("Args:Inside CreateEvent", payload);
        const formattedDate = new Date(payload.date).toISOString();

        return db.event.create({
            data: {
                date: formattedDate,
                ...payload
            },
        })
    }

    public static async getEvents() {
        console.log("Args:Inside GetEvents");
        return db.event.findMany({
            orderBy: {
                date: 'desc'
            },
            include:{
                location:true
            }
        })
    }
}
export default EventService
