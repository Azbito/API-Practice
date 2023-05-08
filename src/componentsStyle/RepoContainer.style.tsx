import styled from 'styled-components'

export const StyledRepoContainer = styled.div`
  background-color: #31345f;
  padding: 1.5rem;
  width: 80%;
  height: 100%;
  display: flex;
  align-items: start;
  justify-content: center;
  flex-direction: column;
  border-radius: 1rem;
  transition: .2s;
  position: relative;

  &:hover {
    cursor: pointer;
    background-color: #42386d
  }
`