/* eslint-disable class-methods-use-this */
import React from 'react';
import ServiceStoreInfo from './ServiceStoreInfo';
import { DtosServiceStoreItemDto } from '../../api/api';

import {
  servicestoreInfoGet,
} from '../../auth/auth';

interface State {
  serviceInfo: Array<DtosServiceStoreItemDto>,
}

interface Props {
  testProp?: string;
}

class ServiceStoreInfoList extends React.PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      serviceInfo: [],
    };
  }

  async componentDidMount() {
    const serviceInfo = await servicestoreInfoGet();
    this.setState({
      serviceInfo,
    });
  }

  render() {
    const {
      serviceInfo,
    } = this.state;

    return (
      <div className="clr-col-12">
        <div className="clr-row">
          <>
            {serviceInfo.map((serviceStoreInfoDto: DtosServiceStoreItemDto) => (
              <ServiceStoreInfo
                key={serviceStoreInfoDto.name}
                name={`${serviceStoreInfoDto.name}`}
                description={`${serviceStoreInfoDto.description}`}
                imageBase64={`data:image/jpeg;base64, ${serviceStoreInfoDto.imageBase64}`}
              />
            ))}
          </>
        </div>
      </div>
    );
  }
}
export default ServiceStoreInfoList;
