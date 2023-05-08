import { useContext } from 'react';
import { RepoContext } from '../../contexts/RepoContext';
import { RepoContainer } from '../../componentsStyle/RepoContainer.style';
import { RepoMap } from '../../componentsStyle/RepoMap.style';
import { RepoName } from '../../componentsStyle/RepoName.style';
import { RepoDescription } from '../../componentsStyle/RepoDescription.style';
import { Container } from '../../componentsStyle/Container.style';
import { Title } from '../../componentsStyle/Title.style';
import { StyledLink } from '../../componentsStyle/Link.style';
import { useQuery } from 'react-query';
import axios from 'axios';
import { Repository } from '../../typings/RepoProps';



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