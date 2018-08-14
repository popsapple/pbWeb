// @flow
import React from 'react';
import FrogEditor from './FrogEditor';
import 'bootstrap/dist/css/bootstrap.min.css'

const Home = () => (
  <div className='container'>
    <header className='navbar navbar-expand navbar-dark flex-column flex-md-row bd-navbar' style={{backgroundColor: "#003399", height: '1.5em'}}>
      <nav class="navbar navbar-light">
        <span class="navbar-brand" style={{color: 'white'}}>PageBuilder</span>
          {/* <a class="navbar-brand" href="/about" style={{color: 'white'}}>PageBuilder</a> */}
      </nav>
    </header>
    <FrogEditor />
  </div>
)

export default Home;
