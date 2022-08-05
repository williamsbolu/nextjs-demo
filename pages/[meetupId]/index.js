import { Fragment } from "react";
import Head from "next/head";
import { MongoClient, ObjectId } from "mongodb";

import MeetupDetail from "../../components/meetups/MeetupDetail";

function MeetupDetails(props) {

  return (
    <Fragment>
      <Head>
        <title>{props.meetupData.title}</title>
        <meta name="description" content={props.meetupData.description} />
      </Head>

      <MeetupDetail
        image={props.meetupData.image}
        title={props.meetupData.title}
        address={props.meetupData.address}
        description={props.meetupData.description}
      />
    </Fragment>
  );
}

export async function getStaticPaths() {

  const client = await MongoClient.connect(
    "mongodb+srv://willi:Iqe5r0RrEKwoFuvq@cluster0.mplam.mongodb.net/meetups?retryWrites=true&w=majority"
  );
  const db = client.db();

  const meetupsCollection = db.collection("meetups");

  const meetups = await meetupsCollection.find({}, { _id: 1 }).toArray();  // here we are only fetching the id's
  client.close();

  return {
    fallback: 'blocking',
    paths: meetups.map((meetup) => (   // path: is an array with an object containing another object with d meetupID
      {params: { meetupId: meetup._id.toString() }}
    ))
  };
}

export async function getStaticProps(context) {
  // fetch data for a single meetup

  const meetupId = context.params.meetupId;

  const client = await MongoClient.connect(
    "mongodb+srv://willi:Iqe5r0RrEKwoFuvq@cluster0.mplam.mongodb.net/meetups?retryWrites=true&w=majority"
  );
  const db = client.db();

  const meetupsCollection = db.collection("meetups");

  const selectedMeetup = await meetupsCollection.findOne({ _id: ObjectId(meetupId) }) // here we are fetching a single meetup (a single document(item)) by id
  client.close();

  console.log(selectedMeetup);

  // console.log(meetupId);

  return {
    props: {
      meetupData: {
        id: selectedMeetup._id.toString(),
        title: selectedMeetup.title,
        address: selectedMeetup.address,
        image: selectedMeetup.image,
        description: selectedMeetup.description
      }
    }
  };
}

export default MeetupDetails;

// we add getStaticPaths which has the job of returning an object where we describe all the dynamic segment values (all the meetupId's) for which this page
// should be pre-generated

// fallback: tells nextjs whether your paths array contains all supported parameter values (meetupId) or just some of them

// falback -> false: Here our paths contains all supported meetupId values (m1, m2 etc). returns a 404 page for any value thats not supported
// false defines all supported paths

// falback -> true: Here nextjs will try to generate a page for the meetupId(supported or unsupported) dynamically on d server for d incoming request,
// Here our paths does not contain all supported meetupId values, returns a pre-generated page for any value thats not supported with d (paths)

// falback -> blocking: