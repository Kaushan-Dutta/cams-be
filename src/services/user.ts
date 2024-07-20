
class UserService{
    public static userRegister(email:string, password:string){
        console.log(email,password);
        return {message:"User Register success"}
    }
    
}
export default UserService