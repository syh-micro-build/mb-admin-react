import { NavLink } from "react-router";
import { Counter } from "../../components/Counter";
import { Quotes } from "../../components/Quotes";

export default function About() {
  return (
    <div>
      <nav>
          <NavLink to="/" style={{ color: '#333' }}>
            Home
          </NavLink>
          <span> | </span>
          <NavLink to="/about">About</NavLink>
        </nav>
      <p>This is the about page.</p>
      <Counter />
      <Quotes />
    </div>
  )
}