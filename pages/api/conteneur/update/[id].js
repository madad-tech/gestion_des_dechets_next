import dbConnect from "../../../../util/dbConnect"
import mongoose from 'mongoose'
import { getSession } from 'next-auth/react';

const Conteneur=require('../../../../models/Conteneur')
const Modif=require('../../../../models/Modif')
export default async function handler(req, res) {
    const { id } = req.query
 const session = await getSession({ req: req });
   await dbConnect();

    if(!mongoose.connections[0].readyState){
        return res.status(400).json({status:"errorbd"});

   }else{
    
    let conteneur= await Conteneur.findById(id)
	let conteneur_data=conteneur["_doc"]
	let modifs=[]
	
	 for(let key of Object.keys(conteneur_data)) {
		//console.log(conteneur[key],req.body[key],Object.keys(conteneur))
		if(key!='date'){
		if(conteneur_data[key] != req.body[key] & req.body[key]!=undefined){
			let modif = new Modif({
				user : session.user.name,
				shema : "Conteneur",
				c_id : id,
				key : key,
				old : conteneur_data[key],
				new : req.body[key]
			})
			modifs.push(modif)
			conteneur_data[key] = req.body[key]
		}}
		else{
			if(new Date(conteneur_data[key]).toString()!=new Date(req.body[key]).toString() & req.body[key]!=undefined){
				
			let modif = new Modif({
				user : session.user.name,
				shema : "Conteneur",
				c_id : id,
				key : key,
				old : new Date(conteneur_data[key]).toJSON().substring(0,10),
				new : req.body[key]
			})
			modifs.push(modif)
			conteneur_data[key] = req.body[key]
		}
		}
	}
	try{
		conteneur = await Conteneur.findOneAndUpdate({ _id: id },conteneur_data)
		
		for(let mod of modifs){
			await mod.save()
		}
		
    }catch(e){
        console.log(e)
    }
   
     
     
    
  return res.status(201).json({conteneur:conteneur,status : 'updated'});
  }}
    
  
   