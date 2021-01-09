import React from 'react';
import NavigationBar from '../navigationBar/NavigationBar';
import ServiceStoreInfoList from './ServiceStoreInfoList';

class ServiceStore extends React.PureComponent {
  render() {
    return (
      <div>
        <NavigationBar />
        <div>
          <div>
            <h1>Service Store:</h1>
          </div>
          <ServiceStoreInfoList />
        </div>
      </div>
    );
  }
}
export default ServiceStore;
