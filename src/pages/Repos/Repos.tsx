import axios from 'axios';
import { useContext } from 'react';
import { useQuery } from 'react-query';
import { RepoContext } from '../../contexts/RepoContext';
import { RepoContainer } from '../../components/RepoContainer.style';
import { StyledLink } from '../../components/Link.style';
import { RepoMap } from '../../components/RepoMap.style';
import { RepoName } from '../../components/RepoName.style';
import { RepoDescription } from '../../components/RepoDescription.style';
import { Container } from '../../components/Container.style';
import { Title } from '../../components/Title.style';

export type Repository = {
  full_name: string,
  description: string
}

export function Repos() {
  const { repo, setRepo } = useContext(RepoContext)

  const { isFetching } = useQuery<Repository[]>('repos', async () => {
    const response = await axios.get('https://api.github.com/users/azbito/repos')

    setRepo(response.data)
    return repo
  }, {
    staleTime: 1000 * 60, // 1 minute
  })

  return (
    <Container>
      {isFetching && <p>Loading...</p>}
      <Title>Repositories</Title>
      <RepoMap>
        {repo?.map((item) => {
          return (
            <StyledLink key={item.full_name} to={`repos/${item.full_name}`}>
              <RepoContainer>
                <RepoName>{item.full_name}</RepoName>
                {item.description ? <RepoDescription>{item.description}</RepoDescription> : <RepoDescription>There's no description</RepoDescription>}
              </RepoContainer>
            </StyledLink>
          )
        })}
      </RepoMap>
    </Container>
  )
}