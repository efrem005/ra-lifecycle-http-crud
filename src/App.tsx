import { useEffect, useState } from 'react'
import NotesForm from './components/NotesForm/NotesForm'
import NotesList from './components/NotesList/NotesList'
import type { Note } from './types/note'

const API_URL = import.meta.env.VITE_API_URL

function App() {
  const [notes, setNotes] = useState<Note[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchNotes = async () => {
    setLoading(true)
    setError(null)
    try {
      const response = await fetch(API_URL)
      if (!response.ok) {
        throw new Error('Ошибка при загрузке заметок')
      }
      const data: Note[] = await response.json()
      setNotes(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Неизвестная ошибка')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchNotes()
  }, [])

  const addNote = async (content: string) => {
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: 0, content }),
      })
      if (!response.ok) {
        throw new Error('Ошибка при добавлении заметки')
      }
      await fetchNotes()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Неизвестная ошибка')
    }
  }

  const deleteNote = async (id: number) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
      })
      if (!response.ok) {
        throw new Error('Ошибка при удалении заметки')
      }
      await fetchNotes()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Неизвестная ошибка')
    }
  }

  return (
    <div className="app">
      <h1>📝 Заметки</h1>

      <div className="bento-grid">
        <div className="bento-card form-card">
          <div className="bento-card-header">
            <h2 className="bento-card-title">Новая заметка</h2>
            <div className="controls">
              <button
                className="refresh-btn"
                onClick={fetchNotes}
                disabled={loading}
                aria-label="Обновить список"
                title="Обновить"
              >
                ↻
              </button>
            </div>
          </div>
          {error && <p className="error-message">{error}</p>}
          <NotesForm onAdd={addNote} />
        </div>

        {/* Список заметок */}
        <div className="bento-card notes-list-card">
          <div className="bento-card-header">
            <h2 className="bento-card-title">Список заметок</h2>
          </div>
          {!loading ? <NotesList notes={notes} onDelete={deleteNote} /> : <p className="loading-message">Загрузка...</p>}
        </div>
      </div>
    </div>
  )
}

export default App
