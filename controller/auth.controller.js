import { authService } from "../services/auth.service.js";

const registor = async (req,res) => {
    try {
        //get data from request
        const body = req.body
        const {username,password,email} = body

        //check the data 
        if(!username || !password || !email){
            res.status(400).json({message : "data is incompete"})
        }

        // create the user  
        const newUSer = await authService.createUser(body)

        if(newUSer instanceof Error){
            res.status(400).json({message : newUSer.message})
        }

        //response back that user is created
        res.json({
            messgae : "user is created"
        }).status(201)
    } catch (error) {
        res.status(500).json({message : error.messgae})
    }
}

const login = async(req,res)=>{
    try {
        // getting data
        const {username , password , email} = req.body

        // validating data
        if((!username || !email) && !password ){
            res.status(401).josn({message : "data is incompete"})
        }
        
        // login
        const accessToken = await authService.loginUser(req.body)

        if(accessToken instanceof Error){
            res.status(401).json({message : accessToken.message})
        }

        // res
        res.cookie('access-token', accessToken , {
            httpOnly: true, 
            maxAge: 24 * 60 * 60 * 1000, // 1 day
            secure: false,
          });

    res.status(200).json({ message : "user loged in"})
        
    } catch (error) {
        res.status(500).json({message : error.message})
    }
}

const logout = async(req,res)=>{
    try {
        res.clearCookie('access-token', {
            httpOnly: true,
            secure: false,
            sameSite: 'Strict',
          });
        
        res.json({ message: 'Logged out successfully.' });
    } catch (error) {
        res.status(500).json({message : error.message})
    }
}

export {
    registor,
    login,
    logout
}

