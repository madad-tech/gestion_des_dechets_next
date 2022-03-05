import React from 'react';
import { getSession } from 'next-auth/react';
import TableConteneur from '../components/TableConteneur';

export default function dashboard(){
  return (
  <TableConteneur></TableConteneur>
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
  return {
      props: { session },
  };
}