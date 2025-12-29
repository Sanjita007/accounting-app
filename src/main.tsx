import { Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import './css/globals.css';
import App from './App.tsx';
import Spinner from './views/spinner/Spinner.tsx';
import { CustomBoxContextProvider } from './components/shared/useConfirmation.tsx';
// Added the Provider here, so that the context can be passed down from the toot level, i.e. the App component.
createRoot(document.getElementById('root')!).render(
  <Suspense fallback={<Spinner />}>
    <CustomBoxContextProvider>
      <App />
    </CustomBoxContextProvider>
  </Suspense>,
);
