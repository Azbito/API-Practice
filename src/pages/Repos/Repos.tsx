import './styles.css';
import axios from 'axios';
import { useContext } from 'react';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import { RepoContext } from '../../contexts/RepoContext';

export type Repository = {
  full_name: string,
  description: string
}

export function Repos() {
  const { repo, setRepo } = useContext(RepoContext)

  const { data, isFetching } = useQuery<Repository[]>('repos', async () => {
    const response = await axios.get('https://api.github.com/users/azbito/repos')

    setRepo(response.data)

    return repo
  }, {
    staleTime: 1000 * 60, // 1 minute
  })

  return (
    <ul>
      {isFetching && <p>Loading...</p>}
      {repo?.map((item) => {
        return (
          <li key={item.full_name}>
            <Link to={`repos/${item.full_name}`}>{item.full_name}</Link>
            {item.description ? <p>{item.description}</p> : <p>There's no description</p>}
          </li>
        )
      })}
    </ul>
  )
}