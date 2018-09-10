import { Component } from 'react';
import Error from '../components/404Error'

export default class ErrorPage1 extends Component {
    constructor(){
      super();
    };
  
    render() {
      return (
          <div>
              <Error/>
          </div>
      );
    }
  }