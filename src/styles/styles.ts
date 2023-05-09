import { Link } from 'react-router-dom'
import { styled } from 'styled-components'

export const Button = styled.button`
  border: none;
  outline: none;
  border-radius: 0.8rem;
  background-color: #51bb51;
  transition: 0.2s;
  padding: 0.5rem;
  color: white;
  cursor: pointer;

  &:hover {
    background-color: #6ed46e;
  }

  &:active {
    background-color: #4e994e;
  }

  &:disabled {
    background-color: black;
  }
`
export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin-top: 5rem;
  gap: 2rem;
`

export const FollowContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
`
export const FollowersTitle = styled.b`
  font-size: 1rem;
`

export const Icon = styled.img`
  border-radius: 5rem;
  width: 8rem;
  height: auto;
`

export const Input = styled.input`
  background-color: #1f1b1b;
  color: white;
  outline: none;
  border: none;
  padding: 1rem;
  border-radius: 0.5rem;
`

export const ItalicText = styled.p`
  font-style: italic;
  width: 100%;
  text-align: center;
`

export const LinkContainer = styled(Link)`
  color: white;
  text-decoration: none;
  font-weight: bold;

  &:visited {
    color: #a8a8a8;
  }
`
export const RepoContainer = styled.div`
  background-color: #31345f;
  padding: 1.5rem;
  width: 80%;
  height: 100%;
  display: flex;
  align-items: start;
  justify-content: center;
  flex-direction: column;
  border-radius: 1rem;
  transition: 0.2s;
  position: relative;

  &:hover {
    cursor: pointer;
    background-color: #42386d;
  }
`

export const Description = styled.p`
  font-size: 1rem;
  font-weight: 200;
`

export const RepoLang = styled.p`
  font-weight: 400;
`

export const RepoMap = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  align-items: center;
  justify-content: center;
  gap: 4rem;
  padding: 2rem 5rem 5rem 5rem;
`

export const RepoName = styled.b`
  font-size: 1.5rem;
  font-weight: 400;
`

export const StargazerCount = styled.b`
  margin-top: 0.2rem;
`

export const StargazerCounter = styled.div`
  display: flex;
  align-items: center;
  text-align: center;
  background-color: rgb(248, 156, 69);
  color: white;
  width: auto;
  padding: 0.5rem 1rem 0.5rem 1rem;
  border-radius: 1rem;
  position: absolute;
  top: -1rem;
`

export const ThinTitle = styled.p`
  font-weight: 400;
`

export const Title = styled.b`
  font-size: 1.8rem;
`

export const UserContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background-color: #00000052;
  width: 25rem;
  height: auto;
  padding: 5rem 2.5rem 5rem 2.5rem;

  border-radius: 1rem;
`

export const Warning = styled.b`
  background-color: #d33e3e;
  padding: 1rem;
  border-radius: 0.5rem;
  margin-top: -5rem;
`
