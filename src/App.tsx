import { Suspense } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import { CssBaseline, ThemeProvider } from '@mui/material';

import ErrorBoundary from './providers/ErrorBoundary';
import { Loader } from './components/UI/Loader';
import { AppRouter } from './router/router';
import { store } from './store/store';
import { theme } from './theme';


function App() {

  return (
    <ErrorBoundary>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <BrowserRouter>
            <Suspense fallback={<Loader />}>
              <AppRouter />
            </Suspense>
          </BrowserRouter>
        </ThemeProvider>
      </Provider>
    </ErrorBoundary>
  );
}

export default App;
