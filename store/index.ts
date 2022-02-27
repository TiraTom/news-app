import {createStore, combineReducers} from 'redux';
import userReducer from './reducers/user';
import {composeWithDevTools} from 'redux-devtools-extension';
import {persistReducer, persistStore} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';


// const store = createStore(persistedReducer, composeWithDevTools());

// export const persistor = persistStore(store)
// export default store;

const rootReducer = combineReducers ({
  user: userReducer,
})

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['user']
}
type RootState = ReturnType<typeof rootReducer>

export default () => {
  const persistedReducer = persistReducer<RootState, any>(persistConfig, rootReducer)
  
  const store = createStore(persistedReducer, composeWithDevTools());

  const persistor = persistStore(store)

  return {store, persistor}
}