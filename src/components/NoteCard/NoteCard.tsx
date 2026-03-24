import type { Note } from '../../types/note'
import './NoteCard.css'

interface NoteCardProps {
  note: Note
  onDelete: (id: number) => void
}

function NoteCard({ note, onDelete }: NoteCardProps) {
  return (
    <div className="note-card">
      <p className="note-content">{note.content}</p>
      <button
        className="delete-btn"
        onClick={() => onDelete(note.id)}
        aria-label="Удалить заметку"
        title="Удалить"
      >
        ✕
      </button>
    </div>
  )
}

export default NoteCard
