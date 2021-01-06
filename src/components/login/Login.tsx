/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
/* import { CdsButton } from '@cds/react/button'; */
/* import { CdsAlert } from '@cds/react/alert'; */
import { CdsInput } from '@cds/react/input';
import { CdsFormGroup } from '@cds/react/forms';

interface AppProps {
  testProp?: string;
}

interface AppState {
  username: string;
  password: string;
  counter: number;
}

class Login extends React.Component<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props);

    this.state = {
      username: '',
      password: '',
      counter: 0,
    };
  }

  handleAuth() :void {
    this.setState({
      username: '',
      password: '',
    });
  }

  render() {
    return (
      <div>
        <div>{this.state.counter}</div>
        <div className="login-wrapper">
          <CdsFormGroup className="login">
            <section className="title">
              <h1 cds-text="welcome">Welcome to</h1>
              the Service Manager
              <h5 className="hint">Use your Username and Password to login</h5>
            </section>
            <CdsInput>
              <label>
                Username
              </label>
              <input
                value={this.state.username}
                onChange={(e) => this.setState({ username: e.target.value })}
                placeholder="Username"
              />
            </CdsInput>
            <CdsInput>
              <label>
                Password
              </label>
              <input
                type="password"
                value={this.state.password}
                onChange={this.handleAuth}
                placeholder="Password"
              />
            </CdsInput>
          </CdsFormGroup>
        </div>
      </div>
    );
  }
}

export default Login;
