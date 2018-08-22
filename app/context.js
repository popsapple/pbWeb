import React, { Component, createContext } from 'react';
import { createStore } from 'redux';
import counterApp  from './reducers/reducers';
import { setEditorView }  from './actions/actions';
const Context = createContext(); // Context 를 만듭니다.
const { Provider, Consumer: SampleConsumer } = Context; 


const store = createStore(counterApp);

class SampleProvider extends Component {
  render() {
  let value = createStore(counterApp)
    return (
      <Provider value={value}>
        {this.props.children}
      </Provider>
    )
  }
}

export {
  SampleProvider,
  SampleConsumer
};