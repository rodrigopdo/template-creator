import styled from 'styled-components';

import colors from '../../styles/colors';

export const Btn = styled.button `
  width: ${(props) => props.width || '180px'};
  background-color: ${props => props.bgColor || colors.pureGreen};
  height: ${(props) => props.height || '40px'};
  border-radius: 50px;
  border: ${(props) => props.border ? '2px solid' + colors.white : '1px solid' + colors.pureGreen};
  outline: none;
  color: ${(props) => props.color || colors.white};
  font-size: 0.8rem;
  text-transform: uppercase;
  font-weight: 600;
  margin: ${(props) => props.margin || '10px 0'};
  transition: 0.5s;

  &:hover {
    background-color: ${(props) => props.hoverColor || 'transparent'};
    border: ${(props) => props.hoverBorder || '2px solid' + colors.pureGreen}
  }
  &:disabled {
    background-color: ${({ theme}) => theme.background};
    color: ${colors.cleanGreen2};
    cursor: initial;
  }
`;
