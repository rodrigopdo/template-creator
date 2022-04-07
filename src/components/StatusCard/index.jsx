import React from 'react'
// import { Link } from 'react-router-dom';
import Image from '../../assets/img/ellipsis-vertical-solid.svg';
import { Card } from './styles';

const StatusCard = props => {
  return (
    <Card onClick={props.onclick}>
      <div>
        <h4>{props.count}</h4>
        <h5>{props.title}</h5>
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
