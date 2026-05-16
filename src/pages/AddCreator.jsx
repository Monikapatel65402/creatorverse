import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { supabase } from '../client'

export default function AddCreator() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ name: '', url: '', description: '', imageURL: '' })
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  async function handleSubmit(e) {
    e.preventDefault()
    if (!form.name || !form.url || !form.description) {
      setError('Name, channel URL, and description are required.')
      return
    }
    setSubmitting(true)
    const { error } = await supabase.from('creators').insert([{
      name: form.name,
      url: form.url,
      description: form.description,
      imageURL: form.imageURL || null,
    }])
    if (error) {
      setError(error.message)
      setSubmitting(false)
    } else {
      navigate('/creators')
    }
  }

  return (
    <div className="page-container form-page">
      <Link to="/creators" className="back-link">← All Creators</Link>
      <h2>Add a Creator</h2>

      {error && <p className="error-msg">{error}</p>}

      <form onSubmit={handleSubmit}>
        <div className="form-field">
          <label className="form-label">Name</label>
          <span className="form-hint">The creator's name or channel name</span>
          <input
            className="form-input"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="e.g. MrBeast"
          />
        </div>

        <div className="form-field">
          <label className="form-label">Image</label>
          <span className="form-hint">Provide a link to an image of your creator. Be sure to include the http://</span>
          <input
            className="form-input"
            name="imageURL"
            value={form.imageURL}
            onChange={handleChange}
            placeholder="https://..."
          />
        </div>

        <div className="form-field">
          <label className="form-label">Description</label>
          <span className="form-hint">Provide a description of the creator. Who are they? What makes them interesting?</span>
          <textarea
            className="form-textarea"
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Tell us about this creator..."
          />
        </div>

        <p className="form-section-title">Channel Link</p>

        <div className="form-field">
          <div className="form-platform-label">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
              <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
            </svg>
            Channel / Page URL *
          </div>
          <span className="form-hint">Full URL to their channel, profile, or page (YouTube, TikTok, Twitch, etc.)</span>
          <input
            className="form-input"
            name="url"
            value={form.url}
            onChange={handleChange}
            placeholder="https://www.youtube.com/@..."
          />
        </div>

        <div className="form-actions">
          <button type="submit" className="btn-submit" disabled={submitting}>
            {submitting ? 'Adding...' : 'Add Creator'}
          </button>
          <Link to="/creators" style={{ display: 'block', textAlign: 'center', padding: '0.85rem', background: 'transparent', border: '2px solid #00b4d8', borderRadius: '6px', color: '#00b4d8', fontWeight: '700', fontSize: '0.92rem', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
            Cancel
          </Link>
        </div>
      </form>
    </div>
  )
}
