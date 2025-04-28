import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Button, DatePicker } from 'antd';
import { useIntl } from 'react-intl';
import { setLocale, getLocale } from './locales';

function App() {
  const intl = useIntl();
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className='switch-lang'>
        <button style={getLocale()==='zh-CN'?{color: 'blue'}:{}} onClick={() => setLocale('zh-CN')}>
          中文
        </button>
        <button style={getLocale()==='en-US'?{color: 'blue'}:{}} onClick={() => setLocale('en-US')}>
          English
        </button>
      </div>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <Button type="primary">{ intl.formatMessage({id:'pages.button'}) }</Button>
        <DatePicker />
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
