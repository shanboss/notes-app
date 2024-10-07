import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";

export default function NoteList({ notes, handleEditNote, confirmDeleteNote }) {
  return (
    <div>
      {[...notes].reverse().map((note) => (
        <div key={note.id} className="p-4">
          <div className="text-xl bg-neutral-900 p-2 rounded-md">
            <div className="flex flex-row gap-x-6 items-center">
              {note.title}
              <button onClick={() => handleEditNote(note.id)}>
                <PencilSquareIcon className="h-8 text-green-500 hover:text-green-400 hover:bg-neutral-700 rounded-lg" />
              </button>
              <button onClick={() => confirmDeleteNote(note.id)}>
                <TrashIcon className="h-8 text-red-500 hover:text-red-400 hover:bg-neutral-700 rounded-lg" />
              </button>
            </div>
          </div>
          <div className="p-2 text-lg">
            <p>
              <span>Created on:</span> {note.creationDate}
            </p>
            <p>{note.contents}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
