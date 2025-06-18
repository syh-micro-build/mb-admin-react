import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@ant-design/v5-patch-for-react-19';
import { Provider } from "react-redux"
import { store } from './stores'
import {
  RouterProvider,
} from "react-router";
import { router } from './router'
import IntlProviderWrapper from './locales/InitlProviderWrapper.tsx';
import './styles/index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <IntlProviderWrapper>
        <RouterProvider router={router} />
      </IntlProviderWrapper>
    </Provider>
  </StrictMode>,
)
