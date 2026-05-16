import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <div className="hero">
      <div className="hero-overlay" />
      <div className="hero-content">
        <h1 className="hero-title">CREATORVERSE</h1>
        <div className="hero-buttons">
          <Link to="/creators" className="hero-btn">VIEW ALL CREATORS</Link>
          <Link to="/creator/add" className="hero-btn">ADD A CREATOR</Link>
        </div>
      </div>
    </div>
  )
}
