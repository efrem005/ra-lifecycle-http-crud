import { useState, type SubmitEvent } from 'react'
import './NotesForm.css'

interface NotesFormProps {
  onAdd: (content: string) => void
}

function NotesForm({ onAdd }: NotesFormProps) {
  const [content, setContent] = useState('')

  const handleSubmit = (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (content.trim()) {
      onAdd(content.trim())
      setContent('')
    }
  }

  return (
    <form className="notes-form" onSubmit={handleSubmit}>
      <input
        type="text"
        className="notes-input"
        placeholder="Введите текст заметки"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <button type="submit" className="add-btn" disabled={!content.trim()}>
        Добавить
      </button>
    </form>
  )
}

export default NotesForm
