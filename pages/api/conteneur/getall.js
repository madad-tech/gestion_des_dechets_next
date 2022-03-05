import dbConnect from "../../../util/dbConnect"
import mongoose from 'mongoose'

const Conteneur=require('../../../models/Conteneur')
export default async function handler(req, res) {

    await dbConnect();

    if(!mongoose.connections[0].readyState){
        return res.status(400).json({status:"errorbd"});

   }else{
     // check if user exists in db 
     const conteneurs= await Conteneur.find() // order by date ' plus récent '
     

   
  return res.status(201).json({conteneurs: conteneurs.length%6==0 ? conteneurs.length/6 : Math.floor(conteneurs.length/6)+1});
   }
    
  }