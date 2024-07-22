//@ts-nocheck
import { db } from "../lib/db.config";

class AgencyService{
    public static agencyRegister(payload){
        const {email, name,phone,document,pincode,latitude,longitude} = payload
        return db.agencyApplication.create({
            data: {
                email: email,
                name: name,
                phone: phone,
                document: document,
                pincode:pincode,
                latitude:latitude,
                longitude:longitude
              },
        })
        
    }

    public static getAlerts(payload){
        const {id}=payload
        return {message:"Alerts fetched"}
    }
    public static updateAlert(payload){
        const {id}=payload
        console.log(id);
        return {message:"Alert Updated"}
    }

    public static updateCaseStatus(payload){
        const {id,status}=payload
        console.log(id,status);
        return {message:"Case Status Updated"}
    }
    public static getCases(payload){
        
        return {message:"Cases fetched"}
    }

    public static updateCaseEvidence(payload){
        return {message:"Case Evidence Updated"}
    }
}
export default AgencyService