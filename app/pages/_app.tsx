import { Provider } from 'react-redux';
import { store, persistor } from '../../store/store';
import { PersistGate } from 'redux-persist/integration/react';
import { AppProps } from 'next/app';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Component {...pageProps} />
      </PersistGate>
    </Provider>
  );
}

export default MyApp;