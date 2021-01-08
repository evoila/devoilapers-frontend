import React from 'react';
import NavigationBar from '../navigationBar/NavigationBar';

class PageNotFound extends React.PureComponent {
  render() {
    return (
      <div>
        <NavigationBar />
        <div>
          <h1>Page Not Found</h1>
        </div>
      </div>
    );
  }
}
export default PageNotFound;
