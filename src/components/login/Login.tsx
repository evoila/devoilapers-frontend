import React from 'react';
import { CdsInput } from '@cds/react/input';
import { CdsFormGroup } from '@cds/react/forms';
import { CdsButton } from '@cds/react/button';
import { CdsAlert, CdsAlertGroup } from '@cds/react/alert';
import { login } from '../../auth/auth';

interface AppProps {
  testProp?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  history: any
}

interface AppState {
  username: string;
  password: string;
  visibleAllert: boolean;
  disableLoginBtn: boolean;
}

class Login extends React.Component<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props);

    this.state = {
      username: '',
      password: '',
      visibleAllert: true,
      disableLoginBtn: false,
    };

    this.handleAuth = this.handleAuth.bind(this);
  }

  componentDidMount() {
    document.title = 'Login';
  }

  async handleAuth() :Promise<void> {
    this.setState({
      disableLoginBtn: true,
    });
    const { history } = this.props;

    const { username, password } = this.state;

    const valid = await login(`${username}`, `${password}`);

    if (valid) {
      history.push('/');
    } else {
      this.setState({
        visibleAllert: false,
        disableLoginBtn: false,
      });
    }
  }

  render() {
    const {
      username,
      password,
      visibleAllert,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      disableLoginBtn,
    } = this.state;
    return (
      <div className="login-wrapper">
        <div>
          <CdsFormGroup
            className="login"
            onSubmit={this.handleAuth}
          >
            <section className="title">
              <h1 cds-text="welcome">Welcome to</h1>
              the Service Manager
              <h5 className="hint">Use your Username and Password to login</h5>
            </section>
            <CdsInput>
              <label htmlFor="username">
                Username
              </label>
              <input
                id="username"
                name="username"
                value={username}
                onChange={(e) => this.setState({ username: e.target.value })}
                placeholder="Username"
              />
            </CdsInput>
            <CdsInput>
              <label htmlFor="password">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => this.setState({ password: e.target.value })}
                placeholder="Password"
              />
            </CdsInput>
            <CdsAlertGroup status="danger" hidden={visibleAllert}>
              <CdsAlert>
                Username or Password was wrong. Please try again.
              </CdsAlert>
            </CdsAlertGroup>
            <CdsButton
              block
              type="submit"
              onClick={this.handleAuth}
            >
              Log In
            </CdsButton>
          </CdsFormGroup>
        </div>
      </div>
    );
  }
}

export default Login;
