import React from 'react'
// import { Link } from 'react-router-dom';

import { Card } from './styles';

const StatusCard = props => {
  return (
    <Card>
      <div>
        <h4>{props.count}</h4>
        <h5>{props.title}</h5>
      </div>
      <div>
        <h4>{props.count2}</h4>
        <h5>{props.title2}</h5>
      </div>
      {/* <Link>
        <p>Ver Detalhes</p>
      </Link> */}
    </Card>
  )
}

export default StatusCard;
