import styled from 'styled-components';

import colors from '../styles/colors';
import { Row } from '../styles/grid';

export const PageContainer = styled.div`
  display: flex;
  margin: 80px auto 10px;
  padding: 0 30px;
  flex-direction: column;
  max-width: 1000px;
`;

export const BtnContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin: 0 5px 60px;
  div:first-child {
    margin-right: 30px;
  }
`;

export const Title = styled.h2`
  color: ${colors.gray3};
  margin: 10px auto 20px 0;
`;

export const CardsWrapper = styled(Row)`
  flex-wrap: wrap;
  margin: 30px auto 40px;
`;

export const HeaderEditor = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 10px 10px 15px;
  width: 100%;
  input {
    color: ${colors.gray1};
    font-size: 1.2rem;
    font-weight: 600;
    width: 400px;
    &::placeholder {
      color: ${colors.gray4};
      font-size: 0.9rem;
    }
  }
`;

export const EditorFooter = styled.div`
  color: ${colors.gray4};
  font-size: 0.8rem;
  margin: 10px auto 20px 0;
`;


