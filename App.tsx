import * as React from 'react';
import AppNavigator from './Navigation/AppNavigator';
import { Provider } from 'react-redux';
import factory from './store';
import { PersistGate } from 'redux-persist/integration/react';

export default function App() {
  const { store, persistor } = factory();

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor} />
      <AppNavigator />
    </Provider>
  );
}
