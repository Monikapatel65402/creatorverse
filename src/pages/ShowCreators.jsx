import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '../client'
import Card from '../components/Card'

export default function ShowCreators() {
  const [creators, setCreators] = useState([])
  const [loading, setLoading] = useState(true)
  const [fetchError, setFetchError] = useState('')

  useEffect(() => {
    async function fetchCreators() {
      const { data, error } = await supabase.from('creators').select('*').order('name')
      if (error) {
        setFetchError(error.message)
      } else {
        setCreators(data)
      }
      setLoading(false)
    }
    fetchCreators()
  }, [])

  return (
    <div className="page-container">
      <header className="page-header">
        <Link to="/" className="back-link">← Home</Link>
        <h2>All Creators</h2>
        <Link to="/creator/add" className="btn-primary">+ Add Creator</Link>
      </header>

      {loading && <p className="center">Loading...</p>}
      {fetchError && <p className="error-msg">{fetchError}</p>}

      {!loading && !fetchError && creators.length === 0 && (
        <p className="center">No creators yet — be the first to add one!</p>
      )}

      <div className="card-grid">
        {creators.map((creator) => (
          <Card key={creator.name} creator={creator} />
        ))}
      </div>
    </div>
  )
}
