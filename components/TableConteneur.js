import React, { useEffect, useState } from 'react';
import Pagination from './Pagination';
import CreateConteneurButton from './CreateConteneurButton';
import { useSession } from 'next-auth/react';
import ConteneurComponent from './ConteneurComponent';
import axios from 'axios';

const TableConteneur = () => {
    const [size,setSize]=useState(1);
const onclickPagination=(page)=>{
    getconteneurs(page);
}
async function getAllConteneurs(){
    await axios.get(`/api/conteneur/getall`,{
       headers: {
         'Access-Control-Allow-Origin':'*' //the token is a variable which holds the token
       }
      }).then(response => {
       setSize(response.data.conteneurs);
     });

   }
const { data: session } = useSession();
const [dataConteneurs,setData]=useState([]);
async function getconteneurs(id){
        
    if(id==undefined){
      id=1;
    }   
    
   await axios.get(`/api/conteneur/${id}`,{
      headers: {
        'Access-Control-Allow-Origin':'*' //the token is a variable which holds the token
      }
     }).then(response => {
      setData(response.data.conteneurs);
    }); }
    
    
    async function deleteMethod(id){
        await axios.get(`/api/conteneur/delete/${id}`,{
            headers: {
              'Access-Control-Allow-Origin':'*' //the token is a variable which holds the token
            }
           }).then(response => {
            let newdatas=dataConteneurs.filter((mydata)=>{
               return mydata._id!=id
            });
            setData(newdatas);
               }
               
          ).catch((e)=>console.log(e));
    } 
    

    const deleteHandle=async (id)=>{
        await deleteMethod(id);
    }

useEffect( ()=>{
    async function init(){
        await getconteneurs();
        await getAllConteneurs();
    }
    init();
   
},[])
        

  return (

    <div className="grid place-items-center h-screen">
  {session!=undefined && (<CreateConteneurButton></CreateConteneurButton>)} 
    <div className="w-full max-w-6xl mx-auto bg-white shadow-lg rounded-sm border border-gray-200 ">
        <header className="px-5 py-4 border-b border-gray-100">
           <div><h2 className="font-semibold text-gray-800 titleConteneur">Liste de conteneur à traiter </h2>
        </div>
        </header>
        <div className="p-3">
            <div className="overflow-x-auto">
                <table className="table-auto w-full">
                    <thead className="text-xs font-semibold uppercase text-gray-400 bg-gray-50">
                        <tr>
						<th className="p-2 whitespace-nowrap">
                                <div className="font-semibold text-center">Action</div>
                            </th>
                             <th className="p-2 whitespace-nowrap">
                                <div className="font-semibold text-center">Type</div>
                            </th>
                            <th className="p-2 whitespace-nowrap">
                                <div className="font-semibold text-center">Nombre</div>
                            </th>
                            <th className="p-2 whitespace-nowrap">
                                <div className="font-semibold text-left">Date</div>
                            </th>
                            <th className="p-2 whitespace-nowrap">
                                <div className="font-semibold text-left">Montant</div>
                            </th>
                            <th className="p-2 whitespace-nowrap">
                                <div className="font-semibold text-left">Caution</div>
                            </th>
                            <th className="p-2 whitespace-nowrap">
                                <div className="font-semibold text-left">Poids</div>
                            </th>
                            
                            <th className="p-2 whitespace-nowrap">
                                <div className="font-semibold text-center">Commentaire</div>
                            </th>
                          
                        </tr>
                    </thead>
                    <tbody className="text-sm divide-y divide-gray-100">
                    {dataConteneurs.map((conteneur)=>{
        return (<ConteneurComponent key={Math.random()} role={session!=undefined && (session.user.image)} data={conteneur} ></ConteneurComponent>)
    })}
                      
                      

                    
                    </tbody>
                </table>
            </div>
            <Pagination onClickHandler={onclickPagination} size={size} ></Pagination>
        </div>
        
    </div>
    
    </div>
  
    );
};

export default TableConteneur;
