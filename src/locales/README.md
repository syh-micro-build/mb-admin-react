# Vite + React + Ant design 国际化方案

- 版本：vite6 + react19 + antd5 + react-intl7

- 应用入口处使用 `InitProviderWrapper` 组件包裹应用容器即可赋能

```tsx
...
import IntlProviderWrapper from './locales/InitlProviderWrapper.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <IntlProviderWrapper>
      <App />
    </IntlProviderWrapper>
  </StrictMode>,
)
```

- 切换方法

```tsx
import { Button, DatePicker } from 'antd';
import { useIntl } from 'react-intl';
import { setLocale, getLocale } from './locales';

function App() {
  const intl = useIntl();

  return (
    <>
      <div className='switchLang'>
        <button style={getLocale()==='zh-CN'?{color: 'blue'}:{}} onClick={() => setLocale('zh-CN')}>
          中文
        </button>
        <button style={getLocale()==='en-US'?{color: 'blue'}:{}} onClick={() => setLocale('en-US')}>
          English
        </button>
      </div>
      <div className="card">
        <Button type="primary">{ intl.formatMessage({id:'pages.button'}) }</Button>
        <DatePicker />
      </div>
    </>
  )
}

export default App

```

详细文档没时间写，后边补上，想干的太多了，忙不过来了啊～～～
