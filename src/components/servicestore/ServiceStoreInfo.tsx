/* eslint-disable react/sort-comp */
/* eslint-disable class-methods-use-this */
import { CdsButton } from '@cds/react/button';
import React from 'react';

interface Props {
  name: string;
  description: string;
  imageBase64: string;
}

class ServiceStoreInfo extends React.PureComponent<Props> {
  createNewService() :void {
    // TODO:
  }

  render() {
    const {
      name,
      description,
      imageBase64,
    } = this.props;

    return (
      <div className="clr-col-lg-4 clr-col-12">
        <div className="card">
          <div className="card-header">
            {name}
          </div>
          <div className="card-block">
            <div className="card-media-block">
              <img alt="Icon" src={imageBase64} className="card-media-image" />
            </div>
            <div className="card-text">
              Description:
            </div>
            <div className="card-text">
              {description}
            </div>
          </div>
          <div className="card-footer">
            <CdsButton
              type="submit"
              onClick={this.createNewService}
            >
              Create New
            </CdsButton>
          </div>
        </div>
      </div>
    );
  }
}
export default ServiceStoreInfo;
