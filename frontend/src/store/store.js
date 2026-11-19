import { combineSlices, configureStore} from "@reduxjs/toolkit"
import { FLUSH, PAUSE, persistReducer, PERSIST, persistStore, PURGE, REGISTER, REHYDRATE } from "redux-persist"
import  userSlice  from './userSlice'
import  tokenSlice  from './tokenSlice'
import  cartSlice  from './cartSlice'

const customStorage = {
  getItem:(key) => {
    return Promise.resolve(window.localStorage.getItem(key));
  },
  setItem:(key, value) => {
    window.localStorage.setItem(key, value);
    return Promise.resolve();
  },
  removeItem:(key) => {
    window.localStorage.removeItem(key);
    return Promise.resolve();
  }
}

const persisConfig = {
  key: "EStore",
  storage: customStorage,
  whitelist: ["user", "token", "cart"]
}

const rootReduce = combineSlices({
  user: userSlice,
  token: tokenSlice,
  cart: cartSlice
})

const persistedReducer = persistReducer(persisConfig, rootReduce);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: {
      ignoreActions: [FLUSH, REHYDRATE, PURGE, PAUSE, PERSIST, REGISTER]
    }
  })
})

export const persistor = persistStore(store)