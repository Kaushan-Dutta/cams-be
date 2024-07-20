//@ts-nocheck

class AgencyService{
    public static agencyApply(payload){
        const {email, name,phone,address,document} = payload
        console.log(payload);
        return {message:"Application Submitted"}
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