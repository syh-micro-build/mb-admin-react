import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@ant-design/v5-patch-for-react-19';
import {
  RouterProvider,
} from "react-router";
import { router } from './router'
import IntlProviderWrapper from './locales/InitlProviderWrapper.tsx';
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <IntlProviderWrapper>
      <RouterProvider router={router} />
    </IntlProviderWrapper>
  </StrictMode>,
)
