import conf from "../conf/conf.js";
import { Client, Databases, Query,Storage,ID } from 'appwrite'

class DataService{
    client = new Client();
    databases;
    storage;
    constructor(){
        this.client
        .setEndpoint(conf.appwriteUrl)
        .setProject(conf.appwriteProjectId);
        this.databases = new Databases(this.client);
        this.storage = new Storage(this.client);
    }
    async createPost({title,slug,content,image,status,userId}){
        try {
            return await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                title,
                content,
                image,
                status,
                userId
            })
        } catch (error) {
            console.log("Error while creating post ::",error);
        }
    }
    async updatePost(slug,{title,content,image,status}){
        try {
            return await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    image,
                    status
                }
            )    
        } catch (error) {
            console.log("Error while uploading post::",error);
        }
    }
    async getPosts(queries = [Query.equal("status",["active"])]){
        try {
            return await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                queries
            )
        } catch (error) {
            console.log("Error while getting all posts ::",error);
            return false;
        }
    }
    async getPost({slug}){
        try {
            return await this.databases.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            )
        } catch (error) {
            console.log("Error while getting post ::",error);
            return false;
        }
    }
    async deletePost(slug){
        try {
            await this.databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            )
            return true;
        } catch (error) {
            console.log("Error while deleting post ::",error);
            return false
        }
    }

    async uploadFile(file){
        try {
            return await this.storage.createFile(
                conf.appwriteBucketId,
                ID.unique(),
                file
            )
        } catch (error) {
            console.log("Error while uploading file ::",error);
            return false;
        }
    }
    async deleteFile(fileId){
        try {
            await this.storage.deleteFile(
                conf.appwriteBucketId,
                fileId
            )
            return true;
        } catch (error) {
            console.log("Error while deleting file::",error);
        }
    }
    getFilePreview(fileId){
        return this.storage.getFilePreview(
            conf.appwriteBucketId,
            fileId
        );
    }
}

const dataService = new DataService();
export default dataService;