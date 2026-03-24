import type { Note } from '../../types/note';
import NoteCard from '../NoteCard/NoteCard';
import './NotesList.css';

interface NotesListProps {
  notes: Note[];
  onDelete: (id: number) => void;
}

function NotesList({ notes, onDelete }: NotesListProps) {
  if (notes.length === 0) {
    return <p className="empty-message">Список заметок пуст</p>;
  }

  return (
    <div className="notes-list">
      {notes.map((note) => (
        <NoteCard key={note.id} note={note} onDelete={onDelete} />
      ))}
    </div>
  );
}

export default NotesList;
