import { configureStore } from '@reduxjs/toolkit';
import { portfolioApi } from './api/portfolioApi';
import { loginApi } from './api/loginApi';
import { contactApi } from './api/contactApi';
import { aboutApi } from './api/aboutApi';
import { experienceApi } from './api/experienceApi';
import { profileApi } from './api/profileApi';
import { skillApi } from './api/skillApi';
import { languageApi } from './api/languageApi';

const store = configureStore({
  reducer: {
    // Adding the RTK Query reducer
    [portfolioApi.reducerPath]: portfolioApi.reducer,
    [loginApi.reducerPath]: loginApi.reducer,
    [contactApi.reducerPath]: contactApi.reducer, 
    [aboutApi.reducerPath]: aboutApi.reducer,
    [experienceApi.reducerPath]: experienceApi.reducer,
    [profileApi.reducerPath]: profileApi.reducer,
    [skillApi.reducerPath]: skillApi.reducer,
    [languageApi.reducerPath]: languageApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
    	portfolioApi.middleware,
			loginApi.middleware,
      contactApi.middleware,
      aboutApi.middleware,
      experienceApi.middleware,
      profileApi.middleware,
      skillApi.middleware,
      languageApi.middleware,
		]),
});

export default store;
