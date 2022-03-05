import dbConnect from "../../../util/dbConnect"
import mongoose from 'mongoose'

const Modif=require('../../../models/Modif')
export default async function handler(req, res) {
    const { id,c_id } = req.query
    await dbConnect();

    if(!mongoose.connections[0].readyState){
        return res.status(400).json({status:"errorbd"});

   }else{
     // check if user exists in db 
     const modifs= await Modif.find({c_id:c_id }).sort({_id: -1}) // order by date ' plus récent '
     

    if (!modifs) {
      return res.status(400).json({status:"none"});
      ;
    }
    
  return res.status(201).json({modifs:modifs.slice(6*(id-1),6*id)});
   }
    
  }