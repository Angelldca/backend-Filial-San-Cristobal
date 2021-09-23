import mongoose from "mongoose";

const dbConnections = async ()=>{
    try {
        await mongoose.connect(process.env.MONGOODB_CNN || "",{
            useNewUrlParser: true,
            useUnifiedTopology:true,
            useCreateIndex:true,
            useFindAndModify:false, 
        });
        console.log("DB on line");
        
    } catch (error) {
        console.log(error);
    }
}

export default dbConnections;