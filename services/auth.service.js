import { User } from "../models/user.model.js";

class AuthService{
    async findUserExist( username ){
        return await User.exists({username})
    }

    async createUser({email , password , username}){
        try {
            
            
            if( await this.findUserExist(username))
                throw new Error("user already exits")
            
            const user = new User({
                username,
                email,
                password,
            })
    
            await user.save()
    
            return user
        } catch (error) {
            return error
        }

    }
    
    async loginUser({ password , username}){
        try {
            const user = await User.findOne({username})
    
            if(!user){
                throw new Error("user doesnt exists")
            }

            const passChecked = await user.comparePassword(password)

            if(!passChecked){
                throw new Error("password is incorrect")
            }

            const accessToken = await user.createAccessToken()

            return accessToken
        } catch (error) {
            return error
        }
    }

}


export const authService = new AuthService()