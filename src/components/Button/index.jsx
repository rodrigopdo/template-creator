import React from 'react'

import { Btn } from './styles';

const Button = props => {
  return (
      <Btn 
        type="submit"
        bgColor={props.bgColor}
        color={props.color}
        width={props.width}
        maxWidth={props.maxWidth}
        hoverColor={props.hoverColor}
        margin={props.margin}
        hoverBorder={props.hoverBorder}
        onClick={props.onClick}
        border={props.border}
        className={props.className}
        disabled={props.disabled}
        padding={props.padding}
      >
        {props.text}
      </Btn>
    
  )
}

export default Button;
