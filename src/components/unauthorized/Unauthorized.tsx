import React from 'react';
import NavigationBar from '../navigationBar/NavigationBar';

class Unauthorized extends React.PureComponent {
  render() {
    return (
      <div>
        <NavigationBar />
        <div>
          <h1>Unauthorized</h1>
        </div>
      </div>
    );
  }
}
export default Unauthorized;
