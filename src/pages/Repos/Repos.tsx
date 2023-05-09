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
import * as S from '../../styles/styles';

// typings
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
    <S.Container>
      <S.Input value={name} onChange={(e: any) => setName(e.target.value)} />
      <S.Button onClick={handleSearch}>Search</S.Button>
      {isFetching && <p>Loading...</p>}
      {userInfos &&
        <S.UserContainer>
          <S.Icon src={userInfos.avatar_url} alt={userInfos.avatar_url} />
          <S.Title>{userInfos?.login}</S.Title>
          <S.ThinTitle>{userInfos.name}</S.ThinTitle>
          <S.ItalicText>{userInfos?.bio}</S.ItalicText>
          <S.FollowContainer>
            <PeopleAltIcon /> <S.FollowersTitle>Followers:</S.FollowersTitle> <S.ThinTitle>{userInfos.followers}</S.ThinTitle> <S.FollowersTitle>• Following:</S.FollowersTitle> <S.ThinTitle>{userInfos.following}</S.ThinTitle>
          </S.FollowContainer>
        </S.UserContainer>
      }
      <S.RepoMap>
        {userInfos?.public_repos == 0 && <S.Warning>This user doesn't have any repositories!</S.Warning>}
        {repo?.map((item) => {
          return (
            <S.LinkContainer key={item.full_name} to={`repos/${item.full_name}`}>
              <S.RepoContainer>
                <S.RepoName>{item.name}</S.RepoName>
                <S.RepoLang>{item?.language}</S.RepoLang>
                <S.StargazerCounter>
                  <StarIcon /> <S.StargazerCount>{item?.stargazers_count}</S.StargazerCount>
                </S.StargazerCounter>
                {item.description ? <S.Description>{item.description}</S.Description> : <S.Description>There's no description</S.Description>}
              </S.RepoContainer>
            </S.LinkContainer>
          )
        })}
      </S.RepoMap>
    </S.Container>
  )
}