import React from "react";
import MeetupDetail from "../../components/meetups/MeetupDetail";
import { MongoClient, ObjectId } from "mongodb";

function MeetupDetails(props) {
  console.log(props.meetupData.description)
  return (
    <MeetupDetail
      image={props.meetupData.image}
      address={props.meetupData.address}
      title={props.meetupData.title}
      id={props.meetupData.id}
      description={props.meetupData.description}
    />
  );
}

export default MeetupDetails;

export async function getStaticPaths() {
  const client = await MongoClient.connect("mongodb+srv://root:hJklqOffVqDQnTCP@nextcluster.svxtzqy.mongodb.net/meetups?retryWrites=true&w=majority")
  const db = client.db();

  const meetupsCollection = db.collection('meetups');
  const meetups = await meetupsCollection.find({}, {_id: 1}).toArray();

  client.close();

  return {
    fallback: false,
    paths: meetups.map(meetup =>({
      params:{
        meetupId: meetup._id.toString()
      }
    }))
  }
}

export async function getStaticProps(context) {
  const id = context.params.meetupId;

  const client = await MongoClient.connect("mongodb+srv://root:hJklqOffVqDQnTCP@nextcluster.svxtzqy.mongodb.net/meetups?retryWrites=true&w=majority")
  const db = client.db();

  const meetupsCollection = db.collection('meetups');
  const selectedMeetup = await meetupsCollection.findOne({ _id: new ObjectId(id), });
  console.log(selectedMeetup)

  client.close();


  return {
    props: {
      meetupData: {
        id: selectedMeetup._id.toString(),
        title: selectedMeetup.title,
        image: selectedMeetup.image,
        address: selectedMeetup.address,
        description: selectedMeetup.description
      }
    }
  }
}
