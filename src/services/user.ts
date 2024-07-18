
type User = {
    id?: string
    email: string
    password: string
    role?: string
}

class UserService{
    public static  createUser(payload:User){
        const {email, password} = payload
        //logic to create user
        console.log(email,password);
        return {message:"User created successfully"}
    }
}
export default UserService