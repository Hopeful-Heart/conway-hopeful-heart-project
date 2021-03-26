import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import './LandingPage.css';
import groupPicture from '../LandingPage/groupPicture.JPG';
import handsIn from '../LandingPage/handsIn.JPG';
import groupPicture2 from '../LandingPage/groupPicture2.jpg'


// CUSTOM COMPONENTS
import LoginForm from '../LoginForm/LoginForm';

function LandingPage() {
  const history = useHistory();

  const onRegister = (event) => {
    history.push('/registration');
  };


  return (
    <div className="container">
      <div className="grid">
        <div className="grid-col grid-col_7">
          <h2 style={{textAlign:'center'}}>
              Welcome
          </h2>
          <p>
            Welcome to Hopeful Heart Project, a non-profit organization dedicated to providing hope, healing, and support to parents
            who have endured the tremendous loss of a child. In honor of the children we have lost, it is our mission to ensure no
            parent must walk this path alone. We strive to educate families in their options, provide them with the resources and
            comfort they may need, and create events centered around self-care and healing. Please do not hesitate to connect with
            us. We all have a story to be told, and we are longing to hear yours. Sending love from two mamas to another.
          </p>
          <img src={groupPicture}/>
          <br/>
          <h2 style={{ textAlign:'center' }}>
            About This App
          </h2>
          <p>
          This is the "Family Connections" application, an application meant to connect those who have experienced the loss of a 
          child. We all know that this experience is difficult to go through alone, but it can also be hard to stay connected 
          with those we love. Family Connections is meant to help with that, connecting you to others going through a similar as 
          you. This application can also help you stay connected to us! Events that we host for our amazing community are all 
          available here in a convenient calendar view.
          </p>
          <img src={handsIn}/>
          <br/>
          <h2 style={{ textAlign:'center' }}>
            Learn More
          </h2>
          <p>
            If you would like to learn more about who we are and what our mission is here at Hopeful Heart Project
            please click below to view our main page!
          </p>
          <img src={groupPicture2}/>
          <form style={{ textAlign:'center' }} action="https://www.hopefulheartproject.org/">
            <button style={{width:100, height:30,backgroundColor:'#414042', color:'white', borderRadius:4}} type="submit">Learn More</button>
          </form> 
        </div>
        <div className="grid-col grid-col_5">
          <LoginForm />
          <center>
            <h4>Not a Member?</h4>
            <button className="btn btn_sizeSm" onClick={onRegister}>
              Register
            </button>
          </center>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
