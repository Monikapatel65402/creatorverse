import { useEffect, useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { supabase } from '../client'

export default function EditCreator() {
  const { id } = useParams()
  const originalName = decodeURIComponent(id)
  const navigate = useNavigate()
  const [form, setForm] = useState({ name: '', url: '', description: '', imageURL: '' })
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    async function fetchCreator() {
      const { data, error } = await supabase
        .from('creators')
        .select('*')
        .eq('name', originalName)
        .single()
      if (!error && data) {
        setForm({
          name: data.name || '',
          url: data.url || '',
          description: data.description || '',
          imageURL: data.imageURL || '',
        })
      }
      setLoading(false)
    }
    fetchCreator()
  }, [originalName])

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
    const { error } = await supabase
      .from('creators')
      .update({ name: form.name, url: form.url, description: form.description, imageURL: form.imageURL || null })
      .eq('name', originalName)
    if (error) {
      setError(error.message)
      setSubmitting(false)
    } else {
      navigate('/creators')
    }
  }

  async function confirmDelete() {
    const { error } = await supabase.from('creators').delete().eq('name', originalName)
    if (!error) navigate('/creators')
  }

  if (loading) return <p className="center">Loading...</p>

  return (
    <div className="page-container form-page">
      <Link to={`/creator/${encodeURIComponent(originalName)}`} className="back-link">← Back to Creator</Link>
      <h2>Edit Creator</h2>

      {error && <p className="error-msg">{error}</p>}

      <form onSubmit={handleSubmit}>
        <div className="form-field">
          <label className="form-label">Name</label>
          <span className="form-hint">The creator's name or channel name</span>
          <input className="form-input" name="name" value={form.name} onChange={handleChange} />
        </div>

        <div className="form-field">
          <label className="form-label">Image</label>
          <span className="form-hint">Provide a link to an image of your creator. Be sure to include the http://</span>
          <input className="form-input" name="imageURL" value={form.imageURL} onChange={handleChange} placeholder="https://..." />
        </div>

        <div className="form-field">
          <label className="form-label">Description</label>
          <span className="form-hint">Provide a description of the creator. Who are they? What makes them interesting?</span>
          <textarea className="form-textarea" name="description" value={form.description} onChange={handleChange} />
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
          <span className="form-hint">Full URL to their channel, profile, or page</span>
          <input className="form-input" name="url" value={form.url} onChange={handleChange} placeholder="https://..." />
        </div>

        <div className="form-actions">
          <button type="submit" className="btn-submit" disabled={submitting}>
            {submitting ? 'Saving...' : 'Submit'}
          </button>
          <button type="button" className="btn-delete" onClick={() => setShowModal(true)}>
            Delete
          </button>
        </div>
      </form>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal-box">
            <h2 className="modal-title">⚠️ WAIT!!!! ⚠️</h2>
            <p className="modal-msg">
              Are you sure you want to delete <strong>{originalName}</strong>???
            </p>
            <div className="modal-buttons">
              <button className="modal-btn modal-btn-cancel" onClick={() => setShowModal(false)}>
                NAH, NEVER MIND
              </button>
              <button className="modal-btn modal-btn-confirm" onClick={confirmDelete}>
                YES! TOTALLY SURE
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
