import conf from '../conf/conf.js'
import { Client, Account, ID } from "appwrite";

class AuthService{
    client; 
    account;
    constructor(){
        this.client = new Client();
        this.client
        .setEndpoint(conf.appwriteUrl)
        .setProject(conf.appwriteProjectId);

        this.account = new Account(this.client);
    }
    async createAccount({email,password,name}){
        try{
            const user = await this.account.create(ID.unique(),email,password,name);
            if (user) return this.login({email,password})
            else return user;
        }
        catch(error){
            console.log("Error while creating account ::" ,error);
        }
    }
    async login({email,password}){
        try {
            return await this.account.createEmailPasswordSession(email,password)
        } catch (error) {
            console.log("Error while login ::",error);
        }
    }
    async getCurrentUser(){
        try {
            return await this.account.get();
        } catch (error) {
            console.log("Error while getting account ::",error);
        }
        return null;
    }
    async logout(){
        try {
            return await this.account.deleteSessions();
        } catch (error) {
            console.log("Error while logging out ::",error);
        }
    }
}

const authService = new AuthService()
export default authService;