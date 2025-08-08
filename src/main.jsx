import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './App';
import store from './store';
import { SnackbarProvider } from 'notistack';
import { SnackbarUtilsConfigurator , CloseButton } from "./components/common/Toast";

import './index.css';

// import {  SnackbarUtilsConfiguration } from './components/common/Toast';
import { AuthProvider } from './context/AuthContext';
import { AppProjectProvider } from './context/AppProjectContext';




createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <AuthProvider>
      <AppProjectProvider>
        <SnackbarProvider
          maxSnack={5}
          autoHideDuration={5000}
          action={(key) => <CloseButton id={key} />}
          preventDuplicate={true}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          classes={{ containerRoot: 'snackbarProvider' }}
        >
          {/* <SnackbarUtilsConfiguration /> */}
          <SnackbarUtilsConfigurator />
          <App />
        </SnackbarProvider>
      </AppProjectProvider>
    </AuthProvider>
  </Provider>
);
