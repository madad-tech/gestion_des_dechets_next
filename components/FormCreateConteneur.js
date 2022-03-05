import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Select from 'react-select';
import axios from 'axios';
import Progress from './Progress';
import Message from './Message';
import 'nprogress/nprogress.css'
import Nprogress from 'nprogress'
import { useSession } from 'next-auth/react';

const FormCreateConteneur = ({dataProps}) => {
    const [error,setError]=useState(false)
    const [success,setSuccess]=useState(false)
     const [showProgress,setProgress]=useState(false)
   
     const { data: session, status } = useSession();

    const [message,setMessage]=useState('');
    const [messageSuccess,setMessageSuccess]=useState("Le conteneur a été créé avec succès")

    const reformat=()=>{
        settype('');
		setnombre('');
        setdate('');
        setmontant('')
        setcaution('')
        setpoids('')
        setcommentaire('')
      
    }
    const [options,setOptions] =useState([]);
      const [selectedOption, setSelectedOption] = useState({value:dataProps.selectedOption,label:dataProps.selectedOption});

    const [type,settype]=useState(dataProps.type);
    const [nombre,setnombre]=useState(dataProps.nombre);
    const [date,setdate]=useState(dataProps.date);
    const [montant,setmontant]=useState(dataProps.montant);
    const [caution,setcaution]=useState(dataProps.caution);
    const [poids,setpoids]=useState(dataProps.poids);
    const [commentaire,setcommentaire]=useState(dataProps.commentaire);
    
    
     
      const addConteneur=async (data)=>{

        const res = await fetch('/api/conteneur/add', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: { 'Content-Type': 'application/json' }
        }).then(res => res.json()
        )
       .then(res => {
           if(res.error){
             setError(true);
             setSuccess(false)
             setMessage(res.error);
             setProgress(false);
             Nprogress.done();
           }else{
               
               if(res.status=="created"){
                 reformat();
                 setSuccess(true)
                 setError(false);
                 setProgress(false);
                 Nprogress.done();
               }
               else{
                 setError(true);
                 setSuccess(false)
                 setMessage("ERROR");
                 setProgress(false);
                 Nprogress.done();
               }
             }
      })}
	  
	  const updateConteneur=async (data)=>{

        const res = await fetch('/api/conteneur/update/'+dataProps.id, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: { 'Content-Type': 'application/json' }
        }).then(res => res.json()
        )
       .then(res => {
           if(res.error){
             setError(true);
             setSuccess(false)
             setMessage(res.error);
             setProgress(false);
             Nprogress.done();
           }else{
               console.log(res.status)
               if(res.status=='updated'){
                 reformat();
                 setSuccess(true)
                 setError(false);
                 setProgress(false);
                 Nprogress.done();
               }
               else{
                 setError(true);
                 setSuccess(false)
                 setMessage("ERROR");
                 setProgress(false);
                 Nprogress.done();
               }
             }
      })}


      const createConteneur=(e)=>{
e.preventDefault();

let responsableNom=session && (session.user && session.user.name) ;
let data={type:type,nombre:nombre,date:date,montant:montant,caution:caution,poids:poids,commentaire:commentaire};

if(dataProps.id!=undefined){
	updateConteneur(data);
}else{
addConteneur(data);
}
      }

   

  return <div className='grid place-items-center h-screen'>
        {showProgress && <Progress></Progress>}
        {error && <Message message={message} color="red"></Message> }
    {success && <Message message={messageSuccess} color="green"></Message> }
<section className="w-full max-w-4xl px-6 py-4 mx-auto bg-white rounded-md shadow-md dark:bg-gray-800">
        <h2 className="text-2xl font-semibold text-center text-gray-800 dark:text-white">Ajouter un nouveau conteneur</h2>
       
  
        <form onSubmit={createConteneur}>
        <div className="mt-6 ">
            <div className="items-center -mx-2 md:flex">
         <div className="w-full mx-2">
                    <label className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200">TYPE</label>
                    <input value={type}  onChange={(e)=>settype(e.target.value)} name="type" className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-opacity-40" type="text"/>
                </div>

                <div className="w-full mx-2 mt-4 md:mt-0">
                    <label className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200">NOMBRE</label>
                    <input value={nombre}  onChange={(e)=>setnombre(e.target.value)} name="nombre" className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-opacity-40" type="number"/>
                </div>
                <div className="w-full mx-2 mt-4 md:mt-0">
                    <label className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200">DATE</label>

                    <input value={date}  onChange={(e)=>setdate(e.target.value)} className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-opacity-40" type="date"/>
                </div>
				
            </div>
            <br></br>
            <div className="items-center -mx-2 md:flex">
        
                <div className="w-full mx-2">
                    
                    <label className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200">MONTANT</label>
                    <input value={montant}  onChange={(e)=>setmontant(e.target.value)} name="nombre" className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-opacity-40" type="number"/>
                 </div>
                            <div className="w-full mx-2">
							<label className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200">CAUTION</label>
							<input value={caution}  onChange={(e)=>setcaution(e.target.value)} name="type" className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-opacity-40" type="text"/>
               
                                  </div>

                <div className="w-full mx-2 mt-4 md:mt-0">
                    <label className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200">POIDS</label>
                    <input value={poids}  onChange={(e)=>setpoids(e.target.value)} name="nombre" className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-opacity-40" type="number"/>
                  </div>
                <div className="w-full mx-2 mt-4 md:mt-0">
                    <label className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200">Ajouter un Commentaire</label>

                <textarea value={commentaire}  onChange={(e)=>setcommentaire(e.target.value)} className="block w-full h-40 px-4 py-2 text-gray-700 bg-white border rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"></textarea>
           </div>
             
            </div>
            

            <div className="flex justify-center mt-6">
                <button className="marginbuttons px-4 py-2 text-white transition-colors duration-200 transform bg-blue-700 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600" type="submit">{(dataProps.id!=undefined)? "Modifier"  : "Ajouter"}</button>
               <Link href="/dashboard"><button type="button" className="px-4 py-2 text-white transition-colors duration-200 transform bg-red-700 rounded-md hover:bg-red-600 focus:outline-none focus:bg-red-600">Retour</button></Link>
            </div>
        </div>
        </form>
    </section>
      
  </div>;
};

export default FormCreateConteneur;
