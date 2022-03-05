import React from 'react';
import { getSession } from 'next-auth/react';
import TableModif from '../../components/TableModif';
import { useRouter } from 'next/router'

export default function historique(req){

  return (
  <TableModif id={req.id}></TableModif>
    );
};

export async function getServerSideProps(context) {

  const session = await getSession({ req: context.req });
  if (!session) {
      return {
          redirect: {
              destination: '/auth',
              permanent: false,
          },
      };
  }
  const id=context.query.id
  
  return {
      props: { session,id:id},
  };
}