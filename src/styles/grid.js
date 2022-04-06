import styled from 'styled-components';

export const Row = styled.div `
  display: flex;
  flex-wrap: wrap;
  width: ${(props) => props.width || "100%"};
  flex-direction: ${(props) => props.flexDirection};
  align-items: ${(props) => props.alignItems || "center"};
  justify-content: ${(props) => props.justifyContent || "center"};
`;

export const Col = styled.div `
  display: flex;
  width: ${(props) => props.width || "100%"};
  align-items: ${(props) => props.alignItems || "center"};
  justify-content: ${(props) => props.justifyContent || "center"};

  @media only screen and (max-width: 1270px) {
    width: ${(props) => props.widthMdScreen || "50%"};
  }
  @media only screen and (max-width: 570px) {
    width: ${(props) => props.widthSmScreen || "100%"};
  }
`;