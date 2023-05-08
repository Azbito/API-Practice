import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { App } from './App';
import { QueryClientProvider } from 'react-query';
import { queryClient } from './services/queryClient';
import { BrowserRouter } from 'react-router-dom';
import { RepoContextProvider } from './contexts/RepoContext';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <RepoContextProvider>
    <StrictMode>
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <App />
        </QueryClientProvider>
      </BrowserRouter>
    </StrictMode>
  </RepoContextProvider>
);
