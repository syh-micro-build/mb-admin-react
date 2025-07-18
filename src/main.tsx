import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@ant-design/v5-patch-for-react-19';
import { Provider } from "react-redux"
import { PersistGate } from "redux-persist/integration/react"
import { store, persistor } from './stores'
import {
  RouterProvider,
} from "react-router";
import router from './router'
import IntlProviderWrapper from './locales/InitlProviderWrapper.tsx';
import './styles/index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <IntlProviderWrapper>
          <RouterProvider router={router} />
        </IntlProviderWrapper>
      </PersistGate>
    </Provider>
  </StrictMode>,
)
