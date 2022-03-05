import dbConnect from "../../../util/dbConnect"
import mongoose from 'mongoose'

const Modif=require('../../../models/Modif')
export default async function handler(req, res) {

    await dbConnect();
    if(!mongoose.connections[0].readyState){
        return res.status(400).json({status:"errorbd"});

   }else{
     // check if user exists in db 
     const modifs= await Modif.find({c_id:req.query.c_id }) // order by date ' plus récent '
     

   
  return res.status(201).json({modifs: modifs.length%6==0 ? modifs.length/6 : Math.floor(modifs.length/6)+1});
   }
    
  }