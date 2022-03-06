import React, { useEffect, useState } from 'react';
import Pagination from './Pagination';
import { useSession } from 'next-auth/react';
import ModifComponent from './ModifComponent';
import axios from 'axios';
import IndexNavbar from "../components/Navbars/IndexNavbar.js";

const TableModif = (props) => {
	const c_id=props.id;
    const [size,setSize]=useState(1);
const onclickPagination=(page)=>{
    getmodifs(page);
}
async function getAllModifs(){
    await axios.get(`/api/modif/getall?c_id=${c_id}`,{
       headers: {
         'Access-Control-Allow-Origin':'*' //the token is a variable which holds the token
       }
      }).then(response => {
       setSize(response.data.modifs);
     });

   }
const { data: session } = useSession();
const [dataModifs,setData]=useState([]);
async function getmodifs(id){
        
    if(id==undefined){
      id=1;
    }   
    
   await axios.get(`/api/modif/${id}?c_id=${c_id}`,{
      headers: {
        'Access-Control-Allow-Origin':'*' //the token is a variable which holds the token
      }
     }).then(response => {
      setData(response.data.modifs);
    }); }
    
    const traitementHandle=async (id)=>{
        await updateStatus(id);
        await getmodifs();
    

    }

    const deleteHandle=async (id)=>{
        await deleteMethod(id);
    }

useEffect( ()=>{
    async function init(){
        await getmodifs();
        await getAllModifs();
    }
    init();
   
},[])

  return (
    
    <div className="grid place-items-center h-screen">
            <IndexNavbar fixed />
    <div className="w-full max-w-6xl mx-auto bg-white shadow-lg rounded-sm border border-gray-200 ">
        <header className="px-5 py-4 border-b border-gray-100">
           <div><h2 className="font-semibold text-gray-800 titleModif">Liste de modif à traiter </h2>
        </div>
        </header>
        <div className="p-3">
            <div className="overflow-x-auto">
                <table className="table-auto w-full">
                    <thead className="text-xs font-semibold uppercase text-gray-400 bg-gray-50">
                        <tr>
                             <th className="p-2 whitespace-nowrap">
                                <div className="font-semibold text-center">User</div>
                            </th>
                            <th className="p-2 whitespace-nowrap">
                                <div className="font-semibold text-center">Table</div>
                            </th>
                            <th className="p-2 whitespace-nowrap">
                                <div className="font-semibold text-left">champs</div>
                            </th>
                            <th className="p-2 whitespace-nowrap">
                                <div className="font-semibold text-left">Ancienne valeur</div>
                            </th>
                            <th className="p-2 whitespace-nowrap">
                                <div className="font-semibold text-left">Nouvelle valeur</div>
                            </th>
                            <th className="p-2 whitespace-nowrap">
                                <div className="font-semibold text-left">Date</div>
                            </th>
                            
                          
                        </tr>
                    </thead>
                    <tbody className="text-sm divide-y divide-gray-100">
                    {dataModifs.map((modif)=>{
        return (<ModifComponent key={Math.random()} role={session!=undefined && (session.user.image)} data={modif} ></ModifComponent>)
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

export default TableModif;
