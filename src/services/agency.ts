
class AgencyService{
    public static agencyApply(payload:any){
        const {email, name,phone,address,document} = payload
        console.log(payload);
        return {message:"Application Submitted"}
    }

    public static getAlerts(id:string){
        return {message:"Alerts fetched"}
    }
    public static updateAlert(id:string){
        console.log(id);
        return {message:"Alert Updated"}
    }

    public static updateCaseStatus(id:string,status:string){
        console.log(id,status);
        return {message:"Case Status Updated"}
    }
    public static getCases(payload:any){
        return {message:"Cases fetched"}
    }

    public static updateCaseEvidence(payload:any){
        return {message:"Case Evidence Updated"}
    }
}
export default AgencyService