import { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';
import { useFetch } from './hooks/useFetch';

type Repository = {
  full_name: string,
  description: string
}

function App() {
  const { data: repositories, isFetching: isLoading } = useFetch<Repository[]>('https://api.github.com/users/azbito/repos')

  return (
    <ul>
      {isLoading && <p>Loading...</p>}
      {repositories?.map(repo => {
        return (
          <li key={repo.full_name}>
            <b>{repo.full_name}</b>
            <p>{repo.description}</p>
          </li>
        )
      })}
    </ul>
  )
}

export default App;
