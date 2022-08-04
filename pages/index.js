import { Fragment } from 'react';
import Head from 'next/head';
import { MongoClient } from "mongodb";
import MeetupList from "../components/meetups/MeetupList";


function HomePage(props) {

  return (
    <Fragment>
      <Head>
        <title>React Meetups</title>
        <meta name='description' content='Browse a huge list of highly active React meetups!' />
      </Head>

      <MeetupList meetups={props.meetups} />
    </Fragment>
  );
}


export async function getStaticProps() {

  // fetch data from a database (note: this is executed in the build process or d server)
  const client = await MongoClient.connect(
    "mongodb+srv://willi:Iqe5r0RrEKwoFuvq@cluster0.mplam.mongodb.net/meetups?retryWrites=true&w=majority"
  ); 
  const db = client.db(); 

  const meetupsCollection = db.collection("meetups");

  const meetupsData = await meetupsCollection.find().toArray();  // gets our data from mongobd in an array(finds all d document in that collection)

  client.close();

  return {
    props: {
      meetups: meetupsData.map(curMeetup => ({
        title: curMeetup.title,
        address: curMeetup.address,
        image: curMeetup.image,
        id: curMeetup._id.toString()
      })),
    },
    revalidate: 10, // this is based on our data update frequency. Can be 1 for 1sec or 3600 fro 60 minutes
  };
}

// export async function getServerSideProps(context) {
//   const req = context.req;
//   const res = context.res;

//   // fetch data from a API eg:
//   // we can run server side code in here and perform operations that use credentials that
//   // should not be exposed to our users cuz this code only runs on d server

//   return {
//     props: {
//       meetups: DUMMY_MEETUPS,
//     },

//     // revalidate not set here, cuz getServerSideProps runs for every incoming request anyways
//   };
// }

export default HomePage;

// getStaticProps() f reserved nextjs name. Nextjs will look for a function with that name, and if it finds it, it will
// executes the function (getStaticProps()) during its pre rendering process, meaning that nextjs wont directly call our
// component function (HomePage) and used the returned jsx code as html content. but it will first call getStaticProps() before it calls d component function
// getStaticProps and others only works inside a page component file. Used when u want to add data fetching to a page

// getStaticProps() job is to prepare (return) props for this page(HomePage), and these props contains the data this page needs, an thats useful
// becus getStaticProps() is allowed to be asynchoronous, nextjs will wait for your promise to resolve and get d data so we return the props for the
// HomePage component function

// note: getStaticProps runs during the build process
// note: getServerSideProps runs on the build server

// revalidate: is added when data changes frequently in a website (eg: data fetched from a database)
// when we add this property, we unlock a feature called incremental static generation, revalidate wants a number and this number is d number of seconds
// nextjs will wait until it re-generates this page for an incoming request
