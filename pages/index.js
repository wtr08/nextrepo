import MeetupList from '../components/meetups/MeetupList'
import Layout from '../components/layout/Layout'
import { useEffect } from 'react';
import { MongoClient } from 'mongodb';
import Head from 'next/head';

const dummy_meetups =  [
    {
      "id": "1",
      "title": "Tech Meetup",
      "address": "123 Main St, Anytown USA",
      "description": "Join us for a night of networking and tech discussions.",
      "image": "https://picsum.photos/id/1015/200/300"
    },
    {
      "id": "2",
      "title": "Entrepreneur Meetup",
      "address": "456 Elm St, Anytown USA",
      "description": "Meet and learn from successful entrepreneurs in your community.",
      "image": "https://picsum.photos/id/1020/200/300"
    },
    {
      "id": "3",
      "title": "Fitness Meetup",
      "address": "789 Oak St, Anytown USA",
      "description": "Get fit and healthy with like-minded individuals in a fun and supportive environment.",
      "image": "https://picsum.photos/id/1025/200/300"
    },
    {
      "id": "4",
      "title": "Music Meetup",
      "address": "10 Pine St, Anytown USA",
      "description": "Join us for a night of live music and meet local musicians.",
      "image": "https://picsum.photos/id/1030/200/300"
    }
  ]
  

function HomePage(props) {

  console.log(props)
  return (
    <>
      <Head>
        <title>React Meetupiess</title>
        <meta name='description' content='Brows a huge list of fun meetups'/>
      </Head>
      <MeetupList meetups={props.meetups}/>
    </>
  )
}



export async function getStaticProps(){

  const client = await MongoClient.connect("mongodb+srv://root:hJklqOffVqDQnTCP@nextcluster.svxtzqy.mongodb.net/meetups?retryWrites=true&w=majority")
  const db = client.db();

  const meetupsCollection = db.collection('meetups');
  const meetups = await meetupsCollection.find().toArray();


  // Method 1: Via API
  // const response = await fetch('http://localhost:3002//api/meetups', {
  //   method: "GET",
  // });

  // const data = await response.json();
  // console.log(data)
  
  return {
    props: {
      meetups: meetups.map(meetup => ({
        title: meetup.title,
        address: meetup.address,
        image: meetup.image,
        id: meetup._id.toString()
      })),
    },
    revalidate: 10
  };
}

export default HomePage