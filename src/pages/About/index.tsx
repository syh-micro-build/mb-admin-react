import { NavLink } from "react-router";

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
    </div>
  )
}