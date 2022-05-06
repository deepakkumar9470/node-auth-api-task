import mongoose from 'mongoose'


const connectDB = async () =>{

    try {
         const DB_OPTIONS = {
             dbName : "node-auth"
         }
        await mongoose.connect(process.env.MONGO_URL, DB_OPTIONS)
        console.log('MongoDB Connected Successfully..')
    } catch (error) {
        console.log(error)
    }
}


export default connectDB