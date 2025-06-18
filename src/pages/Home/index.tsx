import { useState, useEffect } from 'react'
import { NavLink } from "react-router";
import './index.css'
import { Button, DatePicker } from 'antd';
import { useIntl } from 'react-intl';
import { setLocale, getLocale } from '../../locales';
import { getTestApi } from './api';

function Home() {
  const intl = useIntl();
  const [count, setCount] = useState(0)
  const [resText, setResText] = useState('')
  const [resAxiosText, setResAxiosText] = useState('')

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch('/mock/test')
      const data = await res.json()
      setResText(data.data.text)
    }
    fetchData()

    const axiosData = async () => {
      const res = await getTestApi()
      const data = res.data
      setResAxiosText(data.title)
    }
    axiosData()
  }, [])

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          Vite
        </a>
        <a href="https://react.dev" target="_blank">
          React
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
        <nav>
          <NavLink to="/" >
            Home
          </NavLink>
          <span> | </span>
          <NavLink to="/about" style={{ color: '#333' }}>About</NavLink>
        </nav>
      </div>
      <p>Request content(mock):{resText}</p>
      <p>Request content(axios):{resAxiosText}</p>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default Home
