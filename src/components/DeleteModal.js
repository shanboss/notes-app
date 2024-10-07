export default function DeleteModal({
  noteToDelete,
  handleDeleteNote,
  cancelDeleteNote,
}) {
  return (
    <div className="fixed inset-0 flex items-center justify-center">
      <div className="bg-neutral-700 p-6 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold mb-4">
          Are you sure you want to delete this note?
        </h2>
        <div className="flex justify-center items-center space-x-4">
          <button
            onClick={handleDeleteNote}
            className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-lg w-1/2"
          >
            Yes Delete Note
          </button>
          <button
            onClick={cancelDeleteNote}
            className="bg-gray-500 hover:bg-gray-400 text-white p-2 rounded-lg w-1/2"
          >
            No Keep Note
          </button>
        </div>
      </div>
    </div>
  );
}
