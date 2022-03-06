import React from 'react';
import FormCreateConteneur from '../components/FormCreateConteneur';
import { getSession } from 'next-auth/react';

import IndexNavbar from "../components/Navbars/IndexNavbar.js";
import Footer from "../components/Footers/Footer.js";
const addConteneur = ({data}) => {
  return <div>
     <FormCreateConteneur dataProps={data}></FormCreateConteneur>
  </div>;
};

export default addConteneur;

export async function getServerSideProps(context) {
    const session = await getSession({ req: context.req });
    let data=context.query;
    if (!session) {
       
        return {
            redirect: {
                destination: '/auth',
                permanent: false,
            },
        };
    }
    else if(session.user!=undefined){
        
            return {
                props: { session,data },
            }
    
    
    }
    
  }