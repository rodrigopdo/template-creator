import styled from 'styled-components';

import colors from '../styles/colors';
import { Row } from '../styles/grid';

export const PageContainer = styled.div`
  display: flex;
  margin: 80px auto 10px;
  flex-direction: column;
  max-width: 1000px;
`;

export const BtnContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin: 20px 5px;
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

export const InputTemplateName = styled.div`
  margin: 10px auto 10px 0;
  input {
    color: ${colors.gray1};
    font-size: 1.2rem;
    font-weight: 600;
    &::placeholder {
      color: ${colors.gray4};
      font-size: 0.9rem;
    }
  }
`;


