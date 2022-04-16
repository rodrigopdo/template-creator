import styled from "styled-components";

import colors from '../../styles/colors';

export const DropdownContainer = styled.div `
  position: relative;
`;

export const DropdownToggle = styled.button `
  border: 0;
  outline: 0;
  height: 30px;
  width: 30px;
  border-radius: 50px;
  background-color: transparent;
  position: relative;
  img {
    opacity: 0.3;
    height: 14px;
  }
  &:hover {
    background-color: ${colors.gray6};
  }
`;

export const DropdownContent = styled.div `
  position: absolute;
  top: calc(100% + 5px);
  left: 5px;
  right: 0;
  width: max-content;
  max-width: 350px;
  background-color: ${colors.white};
  box-shadow: 0 2px 4px -1px rgb(0 0 0 / 20%), 0 4px 5px 0 rgb(0 0 0 / 14%), 0 1px 10px 0 rgb(0 0 0 / 12%);
  border-radius: 5px;
  overflow: hidden;
  transform-origin: top left;
  transform: scale(0);
  transition: transform .3s ease 0s;
  z-index: 99999;
  div {
    display: flex;
    flex-direction: column;
    width: 100%;
    padding: 10px 20px;
    margin: 0 auto 0 0;
    font-size: 0.7rem;
    font-weight: 700;
    color: ${colors.gray3};
    &:hover {
      background-color: ${colors.gray6}
    }
  }
  button {
    margin: 0 auto 0 0;
    text-align: left;
  }
  &.active {
    transform: scale(1);
    transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  }
`;

