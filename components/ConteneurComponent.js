import React, { useState } from 'react';
import Link from 'next/link';
const ConteneurComponent = ({role,data}) => {
   
   
   
   const deleteC=(e)=>{
        fetch('/api/conteneur/delete/'+data._id, {
            method: 'GET',
        }).then(res => document.location.reload())
   }
   
   
  return  <tr>
 <td className="p-2 whitespace-nowrap">
    
	<Link href={`/addConteneur?id=${data._id}&type=${data.type!=undefined ? data.type : ''}&nombre=${data.nombre!=undefined ? data.nombre : ''}&date=${data.date!=undefined ? data.date.substring(0,10) : ''}&montant=${data.montant!=undefined ? data.montant : ''}&caution=${data.caution!=undefined ? data.caution : ''}&poids=${data.poids!=undefined ? data.poids : ''}&commentaire=${data.commentaire!=undefined ? data.commentaire : ''}`}><button   className="marginbuttons px-4 py-2 font-medium tracking-wide text-white capitalize transition-colors duration-200 transform bg-blue-600 rounded-md hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80">
		Modifier
	</button></Link>

		
	{role=='admin' && (
		<button  onClick={(e)=>deleteC(e)} className="marginbuttons px-4 py-2 font-medium tracking-wide text-white capitalize transition-colors duration-200 transform bg-blue-600 rounded-md hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80">
		Supprimer
		</button>
		
	) }
	{role=='admin' && (
		<Link href={`/historique/${data._id}`}><button   className="marginbuttons px-4 py-2 font-medium tracking-wide text-white capitalize transition-colors duration-200 transform bg-blue-600 rounded-md hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80">
		Historique
	</button></Link>
		
	) }
	
  </td>


  <td className="p-2 whitespace-nowrap">
      <div className="text-left font-medium text-500">{data.type}</div>
  </td>
  <td className="p-2 whitespace-nowrap">
      <div className="text-lg text-center">{data.nombre}</div>
  </td>
  <td className="p-2 whitespace-nowrap">
      <div className="text-lg text-center">{data.date!=undefined && data.date.substring(0,10)}</div>
  </td>
  <td className="p-2 whitespace-nowrap">
      <div className="text-lg text-center">{data.montant}</div>
  </td> 
  <td className="p-2 whitespace-nowrap">
      <div className="text-lg text-center">{data.caution}</div>
  </td>
  <td className="p-2 whitespace-nowrap">
      <div className="text-lg text-center">{data.poids}</div>
  </td>
  
  <td className="p-2 whitespace-nowrap">
      <div className="text-lg text-center">{data.commentaire}</div>
  </td>
  
</tr>;
};

export default ConteneurComponent;
