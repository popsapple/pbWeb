import React from 'react';
import { Link } from 'react-router-dom'

export default class ErrorPage extends React.Component {
  constructor(){
    super();
    
  };
  
  render() {
    return (
        <div>
          <Link to="homePage">GO BACK HOME</Link>
          <img src={require('../../app/404Error.jpg')} style={{ width: '100%', height: '100%' }}/>
        </div>
    );
  }
}