import React from 'react';
import NavigationBar from '../navigationBar/NavigationBar';

class Home extends React.PureComponent {
  render() {
    return (
      <div>
        <NavigationBar />
        <div>
          <h1> Home </h1>
        </div>
      </div>
    );
  }
}
export default Home;
