import React from 'react';
import NavigationBar from '../navigationBar/NavigationBar';

class ServiceStore extends React.PureComponent {
  render() {
    return (
      <div>
        <NavigationBar />
        <div>
          <h1> Service Store </h1>
        </div>
      </div>
    );
  }
}
export default ServiceStore;
