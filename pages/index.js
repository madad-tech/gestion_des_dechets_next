import Head from 'next/head'
import { getSession } from 'next-auth/react';

export default function Home() {



  return (
    <div>
      <Head>
        <title>Gestion des déchets</title>
        <meta name="description" content="gestion de dechets" />
        <link rel="icon" href="/favicon.ico" />


      </Head>

      <main >
   
      </main>

      <footer >
    
      </footer>
    </div>
  )
}



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
    redirect:{
      destination: '/dashboard',
            permanent: false,
    }
  }
  
}