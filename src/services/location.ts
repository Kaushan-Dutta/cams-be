import axios from 'axios';
import { db } from '../lib/db.config';
import dotenv from 'dotenv';
dotenv.config();

const API_KEY=process.env.LOCATION_IQ_API_KEY;

class Locationservice{
    private static async getLocationDetails(latitude:number,longitude:number){
        console.log("Latitude: ",latitude,"Longitude: ",longitude);
        const url=`https://us1.locationiq.com/v1/reverse?key=${API_KEY}&lat=${latitude}&lon=${longitude}&format=json&`;
        console.log(url);
        const res=await axios.get(url);
        console.log(res);
        return {
            longitude:longitude,
            latitude:latitude,
            pincode:res.data.address.postcode,
            state:res.data.address.state,
            district:res.data.address.state_district,
            country:res.data.address.country
        }
        
    }
    public static async addLocationDetails(latitude:number,longitude:number){
        console.log("Args:Inside AddLocationDetails",latitude,longitude);
        const location=await this.getLocationIfExists(latitude,longitude);
        if(location){
            return location;
        }
        const payload=await this.getLocationDetails(latitude,longitude);
        if(!payload){
            return false;
        }
        return db.location.create({
            data:{
                ...payload
            }
        })
    }
    private static async getLocationIfExists(latitude:number,longitude:number){
        console.log("Args:Inside GetLocationIfExists",latitude,longitude);
        return db.location.findFirst({
            where:{
                latitude:latitude,
                longitude:longitude
            }
        })
    }
    
}
export default Locationservice;