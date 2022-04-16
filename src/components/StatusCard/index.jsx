import React from 'react';

import Dropdown from '../Dropdown';

import Image from '../../assets/menu_3_dots.svg';

import { 
  Card,
  MainCardSection,
  MenuContainer
} from './styles';

const StatusCard = props => {

  return (
    <Card >
      <MenuContainer>
        <Dropdown image={Image} />
      </MenuContainer>
      <MainCardSection onClick={props.onclick}>
        <div>
          <h4>{props.title}</h4>
        </div>
        <div>
          <h5>{props.update}</h5>
        </div>
      </MainCardSection>
     
      
    </Card>
  )
}

export default StatusCard;
