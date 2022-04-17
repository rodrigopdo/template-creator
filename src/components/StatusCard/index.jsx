import React from 'react';

import Dropdown from '../Dropdown';

import Image from '../../assets/menu_3_dots.svg';

import { 
  Card,
  MainCardSection,
  MenuContainer
} from './styles';

const StatusCard = ({
  onClick, 
  onClickMenu, 
  title, 
  update,
  id
}) => {

  return (
    <Card >
      <MenuContainer>
        <Dropdown 
          image={Image} 
          onClick={onClickMenu}
          id={id}
        />
      </MenuContainer>
      <MainCardSection onClick={onClick}>
        <div>
          <h4>{title}</h4>
        </div>
        <div>
          <h5>{update}</h5>
        </div>
      </MainCardSection>
     
      
    </Card>
  )
}

export default StatusCard;
