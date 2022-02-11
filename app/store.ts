import contactsReducer from './slices/contactsSlice.js';
import loginReducer from './slices/loginSlice.js';
import { configureStore, combineReducers } from '@reduxjs/toolkit';


const combinedReducers = combineReducers({
  contacts: contactsReducer,
  login: loginReducer
})

//Store creation
const store = configureStore({
  reducer: combinedReducers,
  middleware: (getDefaultMiddleware) => {
    let middlewares = getDefaultMiddleware()

    //Flipper settings
    if (__DEV__) {
      const createDebugger = require("redux-flipper").default
      middlewares = middlewares.concat(createDebugger())
    }

    return middlewares
  },
})

export type AppDispatch = typeof store.dispatch

export default store;
