import React from 'react';
import NavigationBar from '../navigationBar/NavigationBar';

class OperatorStore extends React.PureComponent {
  render() {
    return (
      <div>
        <NavigationBar />
        <div>
          <h1>Operator Store</h1>
        </div>
      </div>
    );
  }
}
export default OperatorStore;
