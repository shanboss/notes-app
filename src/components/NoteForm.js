import { CheckCircleIcon, NoSymbolIcon } from "@heroicons/react/24/outline";

export default function NoteForm({
  newNote,
  setNewNote,
  handleSaveNote,
  handleCancelEdit,
  error,
  setError,
}) {
  return (
    <div className="mt-2">
      {error && (
        <div className="text-white bg-red-500 p-2 rounded-lg mb-2 flex flex-row items-center justify-between lg:w-1/3 md:w-1/2">
          {error}
          <button onClick={() => setError(null)}>
            <NoSymbolIcon className="h-8" />
          </button>
        </div>
      )}
      <div className="flex flex-col gap-y-2">
        <div className="flex flex-row gap-x-2">
          {/* Title Input */}
          <input
            type="text"
            value={newNote.title}
            placeholder="Title"
            onChange={(e) => setNewNote({ ...newNote, title: e.target.value })}
            className="border p-2 bg-black text-neutral-400 w-full"
          />
          {/* Save Button */}
          <button onClick={handleSaveNote} className="bg-green-500 p-2">
            <CheckCircleIcon className="h-6" />
          </button>
          {/* Cancel Button */}
          <button onClick={handleCancelEdit} className="bg-gray-500 p-2">
            <NoSymbolIcon className="h-6" />
          </button>
        </div>
        {/* Content Input */}
        <textarea
          value={newNote.contents}
          placeholder="Contents"
          onChange={(e) => setNewNote({ ...newNote, contents: e.target.value })}
          className="border p-2 bg-black text-neutral-400 h-[30rem]"
        />
      </div>
    </div>
  );
}
