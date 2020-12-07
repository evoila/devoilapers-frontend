import React from 'react';
import { CdsButton } from '@clr/react/button';
import logo from './logo.svg';
import './App.css';

interface Props {
  testProp?: string;
}

interface State {
  counter: number;
}

class App extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      counter: 0,
    };
  }

  render() {
    const { counter } = this.state;
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit
            {' '}
            <code>src/App.tsx</code>
            {' '}
            and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
          <div>{counter}</div>
          <CdsButton onClick={() => this.setState({ counter: counter + 1 })} action="outline" size="md" block>Test</CdsButton>
        </header>
      </div>
    );
  }
}

export default App;
