import mongoose from "mongoose";

const connection = {}

async function connect(){
    if(!!connection.isConnected){
        return;
    }

    mongoose.connect(
        process.env.MONGODB_URI,
        {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }
    ).then((data) =>{
        connection.isConnected = data.connection._readyState;
    }).catch((error) => console.log(error));
}

export default {connect};