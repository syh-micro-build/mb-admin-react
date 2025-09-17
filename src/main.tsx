import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@ant-design/v5-patch-for-react-19';
import { Provider } from "react-redux"
import { PersistGate } from "redux-persist/integration/react"
import { store, persistor } from './stores'
import AppRouter from './router';
import IntlProviderWrapper from './locales/InitlProviderWrapper.tsx';
import './styles/index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <IntlProviderWrapper>
          <AppRouter />
        </IntlProviderWrapper>
      </PersistGate>
    </Provider>
  </StrictMode>,
)
