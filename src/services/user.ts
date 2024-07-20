//@ts-nocheck
class UserService{
    public static userRegister(payload){
        const {email,password} = payload
        console.log(email,password);
        return {message:"User Register success"}
    }
    
}
export default UserService