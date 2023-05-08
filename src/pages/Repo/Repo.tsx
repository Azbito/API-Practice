import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { RepoContext } from '../../contexts/RepoContext';
import axios from 'axios';
import { getLanguageColor } from '../../api/getLangColor';

export function Repo() {
  const params = useParams();
  const currentRepository = params['*'] as string;
  const { repo } = useContext(RepoContext);
  const [mostUsedLanguage, setMostUsedLanguage] = useState('');

  // Find the repository which is matching with the clicked ID
  const selectedRepo = repo.find((item) => item.full_name === currentRepository);

  async function getMostUsedLanguage() {
    try {
      const response = await axios.get(
        `https://api.github.com/repos/${currentRepository}/languages`
      );
      const languages = response.data;
      const mostUsed = Object.keys(languages).reduce(
        (a, b) => (languages[a] > languages[b] ? a : b)
      );
      setMostUsedLanguage(mostUsed);
    } catch (error) {
      console.error('Error fetching most used language:', error);
    }
  }

  useEffect(() => {
    getMostUsedLanguage()
    getLanguageColor('JavaScript').then(color => {
      console.log(color)
    })
  }, [])


  return (
    <div>
      <h1>{currentRepository}</h1>
      {mostUsedLanguage && <p>{mostUsedLanguage}</p>}
      {selectedRepo ? (
        <>
          <p>{selectedRepo.description}</p>
        </>
      ) : (
        <p>There's no description</p>
      )}
    </div>
  );
}
