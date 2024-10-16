import { db } from "../lib/db.config";
class EventService {
    public static getEvent(payload: any) {
        const { id } = payload;
        console.log("Args:Inside GetEvent", payload);
        return db.event.findUnique({
            where: {
                id: id
            }
        });
    }
}
export default EventService
