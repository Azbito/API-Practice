// hooks
import { useContext, useRef, useState } from 'react';
import { useQuery } from 'react-query';

// utils/libs
import { RepoContext } from '../../contexts/RepoContext';
import { Repository } from '../../typings/RepoProps';
import axios from 'axios';

// assets
import StarIcon from '@mui/icons-material/Star';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';

// styled-compoenents
import { StyledContainer } from '../../componentsStyle/Container.style';
import { StyledInput } from '../../componentsStyle/Input.style';
import { StyledButton } from '../../componentsStyle/Button.style';
import { StyledTitle } from '../../componentsStyle/Title.style';
import { StyledRepoMap } from '../../componentsStyle/RepoMap.style';
import { StyledLink } from '../../componentsStyle/Link.style';
import { StyledRepoContainer } from '../../componentsStyle/RepoContainer.style';
import { StyledRepoName } from '../../componentsStyle/RepoName.style';
import { StyledRepoLang } from '../../componentsStyle/RepoLang.style';
import { StyledStargazerCounter } from '../../componentsStyle/StargazerCounter.style';
import { StyledStargazerCount } from '../../componentsStyle/StargazerCount.style';
import { StyledRepoDescription } from '../../componentsStyle/RepoDescription.style';
import { StyledWarning } from '../../componentsStyle/Warning.style';
import { StyledIcon } from '../../componentsStyle/Icon.style';
import { StyledUserContainer } from '../../componentsStyle/UserContainer.style';
import { StyledItalicText } from '../../componentsStyle/ItalicTitle.style';
import { StyledThinTitle } from '../../componentsStyle/ThinTitle.style';
import { StyledFollowersTitle } from '../../componentsStyle/FollowersTitle.style';
import { StyledFollowContainer } from '../../componentsStyle/FollowContainer.style';
import { UserDataProps } from '../../typings/UserDataProps';

type QueryResult = {
  repos: Repository[]
  userData: UserDataProps
}

export function Repos() {
  const { repo, setRepo } = useContext(RepoContext)
  const [name, setName] = useState('')
  const [userInfos, setUserInfos] = useState<UserDataProps | null>(null)
  const previousNameRef = useRef('')

  const { isFetching, refetch } = useQuery<QueryResult>(['repos', name], async () => {
    const reposResponse = await axios.get(`https://api.github.com/users/${name}/repos`);
    const userResponse = await axios.get(`https://api.github.com/users/${name}`);

    setRepo(reposResponse.data);

    const userData: UserDataProps = userResponse.data;

    setUserInfos(userData);

    return {
      repos: repo,
      userData: userData
    };
  }, {
    staleTime: 1000 * 60, // 1 minute
    enabled: false
  });

  console.log(userInfos)
  const handleSearch = () => {
    if (name === previousNameRef.current || !name.trim()
    ) {
      return
    }

    try {
      refetch()
    } finally {
      previousNameRef.current = name
    }
  }

  return (
    <StyledContainer>
      <StyledInput value={name} onChange={(e: any) => setName(e.target.value)} />
      <StyledButton onClick={handleSearch}>Search</StyledButton>
      {isFetching && <p>Loading...</p>}
      {userInfos &&
        <StyledUserContainer>
          <StyledIcon src={userInfos.avatar_url} alt={userInfos.avatar_url} />
          <StyledTitle>{userInfos?.login}</StyledTitle>
          <StyledThinTitle>{userInfos.name}</StyledThinTitle>
          <StyledItalicText>{userInfos?.bio}</StyledItalicText>
          <StyledFollowContainer>
            <PeopleAltIcon /> <StyledFollowersTitle>Followers:</StyledFollowersTitle> <StyledThinTitle>{userInfos.followers}</StyledThinTitle> <StyledFollowersTitle>• Following:</StyledFollowersTitle> <StyledThinTitle>{userInfos.following}</StyledThinTitle>
          </StyledFollowContainer>
        </StyledUserContainer>
      }
      <StyledRepoMap>
        {userInfos?.public_repos == 0 && <StyledWarning>This user doesn't have any repositories!</StyledWarning>}
        {repo?.map((item) => {
          return (
            <>
              <StyledLink key={item.full_name} to={`repos/${item.full_name}`}>
                <StyledRepoContainer>
                  <StyledRepoName>{item.name}</StyledRepoName>
                  <StyledRepoLang>{item?.language}</StyledRepoLang>
                  <StyledStargazerCounter>
                    <StarIcon /> <StyledStargazerCount>{item?.stargazers_count}</StyledStargazerCount>
                  </StyledStargazerCounter>
                  {item.description ? <StyledRepoDescription>{item.description}</StyledRepoDescription> : <StyledRepoDescription>There's no description</StyledRepoDescription>}
                </StyledRepoContainer>
              </StyledLink>
            </>
          )
        })}
      </StyledRepoMap>
    </StyledContainer>
  )
}