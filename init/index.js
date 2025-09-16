const mongoose=require("mongoose");
const initData=require("./data");
const Listing=require("../models/listing");

const MONGO_URL=("mongodb://127.0.0.1:27017/wanderlust");

main()
    .then(()=>{
        console.log("connected to Db");
    })
    .catch((err)=>{
        console.log(err);
    });

async function main(){
    await mongoose.connect(MONGO_URL);
}

const initDB=async()=>{
    await Listing.deleteMany({});
    initData.data=initData.data.map((obj)=>({...obj,owner:"68baf9a36e1c20de8b36fd7a"}));
    await Listing.insertMany(initData.data);
    console.log("data was saved");
}

initDB();