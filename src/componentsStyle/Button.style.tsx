import { styled } from "styled-components";

export const StyledButton = styled.button`
  border: none;
  outline: none;
  border-radius: .8rem;
  background-color: #51bb51;
  transition: .2s;
  padding: .5rem;
  color: white;
  cursor: pointer;

  &:hover {
    background-color: #6ed46e;
  }

  &:active {
    background-color: #4e994e;
  }

  &:disabled {
    background-color: black
  }
`