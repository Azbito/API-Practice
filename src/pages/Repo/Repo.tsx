import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { RepoContext } from '../../contexts/RepoContext';

export function Repo() {
  const params = useParams();
  const currentRepository = params['*'] as string;
  const { repo } = useContext(RepoContext);

  // Find the repository which is matching with the clicked ID
  const selectedRepo = repo.find((item) => item.full_name === currentRepository);

  console.log(selectedRepo)

  return (
    <div>
      <h1>{currentRepository}</h1>
      {selectedRepo ? (
        <>
          <p>{selectedRepo.full_name}</p>
          <p>{selectedRepo.language}</p>
        </>
      ) : (
        <p>There's no description</p>
      )}
    </div>
  );
}
