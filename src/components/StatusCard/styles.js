import styled from 'styled-components';

import colors from '../../styles/colors';

export const Card = styled.div `
  display: flex;
  flex-direction: column;
  width: 100%;
  min-width: 190px;
  max-width: 380px;
  height: 150px;
  min-height: 130px;
  padding: 5px 5px;
  background-color: ${colors.white};
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 14px;
  border-radius: 5px;
  transition: color .9s ease 0s;
  margin: 10px 10px 30px 10px;
  border-right: 2px solid ${colors.cleanGreen2};
  cursor: pointer;
  text-align: end;
  &:hover {
    box-shadow: rgba(149, 157, 165, 0.05) 10px 8px 18px;
  }
`;
  
export const MainCardSection = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 0 0 30px;
  padding: 0 10px;
  justify-content: flex-end;
  max-height: 90%;

  h4 {
    margin: 0 0 30px auto;
    font-size: 0.8rem;
    color: ${colors.gray3};
    opacity: 0.8;
    @media(max-width: 870px) {
      font-size: 0.7rem;
      }
    }
  h5 {
    margin: 0 0 30px auto;
    font-size: 0.7rem;
    font-weight: 500;
    color: ${colors.gray3};
  }
`;  

export const MenuContainer = styled.div`
  width: 30px;
  heigth: 30px;
  margin: 0 auto 0 0;
`;

