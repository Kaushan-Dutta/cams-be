//@ts-nocheck
import { db } from "../lib/db.config";

class NotificationService {
    private static setMessage(messageType, data) {
        switch (messageType) {
            case "EVENT":
                return `Event ${data.name} is going to happen on ${data.date} at ${data.location}`
            case "CASE_ACCEPT":
                return `Your case ${data.name} have been accepted by ${data.agency_name} . You can now track the case`
            case "CASE_REJECT":
                return `Your case ${data.case_name} have been rejected by ${data.agency_name} . Please contact the agency for more details`
            case "CASE_UPDATE":
                return `New Evidence have been added on ${data.case_name} .`
            default:
                return
        }
    }
    public static async createNotification(payload) {
        console.log("Args:Inside CreateNotification", payload);
        const { messageType, data } = payload;
        const message = this.setMessage(messageType, data)

        const inputData = {
            type: payload.type,
            message: message
        }
        if(payload.receiverId) inputData.receiver = { connect: { id: payload.receiverId } }
        if(payload.senderId) inputData.sender = { connect: { id: payload.senderId } }

        return db.notification.create({
            data: inputData
        })
    }

    public static async getNotifications(payload) {
        console.log("Args:Inside GetNotifications", payload);
        const { id } = payload
        return db.notification.findMany({
            where: {
                OR: [
                    { senderId: id },
                    { receiverId: id },
                    {type:"BROADCAST"}
                ]
            },
            orderBy: {
                createdAt: "desc"
            },
            select: {
                id: true,
                message: true,
                createdAt: true
            }
        })
    }

}
export default NotificationService