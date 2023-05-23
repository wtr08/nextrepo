import React from 'react'

function MeetupDetail(props) {
  console.log(props)
  return (
    <>
        <img src={props.image} alt={props.title}/>
        <h1>{props.title}</h1>
        <address>{props.address}</address>
        <p>{props.description}</p>
    </>
  )
}

export default MeetupDetail