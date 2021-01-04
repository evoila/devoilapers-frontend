/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import { CdsButton } from '@clr/react/button';
import { CdsAlert } from '@clr/react/alert';
import { CdsInput } from '@clr/react/input';
import { CdsFormGroup } from '@clr/react/forms';

interface Props {
  testProp?: string;
}

interface State {
  counter: number;
}

class Login extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      counter: 0,
    };
  }

  render() {
    const { counter } = this.state;
    return (
      <div>

        <h1>Login</h1>

        <div className="login-group">
          <div>{counter}</div>
          <CdsButton onClick={() => this.setState({ counter: counter + 1 })}>Log In</CdsButton>
        </div>
        <CdsAlert status="info">
          Hello World
        </CdsAlert>
        <CdsFormGroup>
          <CdsInput>
            <label>
              Username
            </label>
            <input placeholder="Username" />
          </CdsInput>
        </CdsFormGroup>
      </div>
    );
  }
}

export default Login;
