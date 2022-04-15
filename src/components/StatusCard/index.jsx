import React from 'react'
import { Card } from './styles';
import Image from '../../assets/menu_3_dots.svg';

const StatusCard = props => {
  return (
    <Card onClick={props.onclick}>
      <div>
        <h4>{props.title}</h4>
        <h5>{props.update}</h5>
      </div>
      <div>
        <h4>{props.count2}</h4>
        <h5>{props.title2}</h5>
      </div>
      <div>
        <img src={Image} alt="Fechar Modal" />
      </div>
    </Card>
  )
}

export default StatusCard;
