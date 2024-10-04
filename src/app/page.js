"use client";
import React, { useState } from "react";
import {
  TrashIcon,
  PencilSquareIcon,
  CheckCircleIcon,
  NoSymbolIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import initNotes from "/src/data/userNotes.json";

export default function Page() {
  const [notes, setNotes] = useState(initNotes.notes);
  const [newNote, setNewNote] = useState({
    id: null,
    title: "",
    creationDate: "",
    contents: "",
  });
  const [editNoteIndex, setEditNoteIndex] = useState(null); // Track index of the note being edited
  const [noteToDelete, setNoteToDelete] = useState(null); // Track the note being considered for deletion
  const [isCreating, setIsCreating] = useState(false); // Track whether the create form is visible
  const [error, setError] = useState(null); // Error state for validation

  // Save the new or edited note
  const handleSaveNote = () => {
    if (!newNote.title.trim() || !newNote.contents.trim()) {
      setError("Both title and content are required."); // Set error message
      return; // Exit the function early to prevent saving
    }

    setError(null);
    if (editNoteIndex === null) {
      // Create a new note
      const newId = notes.length ? notes[notes.length - 1].id + 1 : 1;
      const noteWithId = {
        ...newNote,
        id: newId,
        creationDate: new Date().toISOString().split("T")[0],
      };
      setNotes([...notes, noteWithId]);
    } else {
      // Edit existing note
      const updatedNotes = notes.map((note, index) =>
        index === editNoteIndex
          ? { ...newNote, creationDate: note.creationDate }
          : note
      );
      setNotes(updatedNotes);
    }

    // Reset the form
    setNewNote({ id: null, title: "", creationDate: "", contents: "" });
    setEditNoteIndex(null); // Reset the edit index after saving
    setIsCreating(false); // Hide the form after saving
  };

  // Confirm deletion of a note
  const confirmDeleteNote = (index) => {
    setNoteToDelete(index); // Set the note to be deleted
  };

  // Cancel delete action
  const cancelDeleteNote = () => {
    setNoteToDelete(null); // Clear the note to delete
  };

  // Edit a note
  const handleEditNote = (index) => {
    const noteToEdit = notes[index];
    setNewNote(noteToEdit);
    setEditNoteIndex(index); // Set the index of the note being edited
  };

  // Actually delete the note after confirmation
  const handleDeleteNote = () => {
    const filteredNotes = notes.filter((note) => note.id !== noteToDelete); // Filter by id, not index
    setNotes(filteredNotes);
    setNoteToDelete(null); // Clear the note to delete
  };

  // Handle creating a new note
  const handleCreate = () => {
    setNewNote({ id: null, title: "", creationDate: "", contents: "" });
    setEditNoteIndex(null); // Indicate that a new note is being created (not editing an existing note)
    setIsCreating(true); // Show the form to create a new note
  };
  // Cancel editing or creating
  const handleCancelEdit = () => {
    setNewNote({ id: null, title: "", creationDate: "", contents: "" });
    setEditNoteIndex(null);
    setIsCreating(false); // Hide the form when canceling
  };

  return (
    <>
      <div className="p-4 text-2xl rounded-lg">
        <div className="flex flex-row gap-x-2 border-b p-2 justify-between">
          <p>Your Notes -</p>
          <button
            onClick={handleCreate}
            className="hover:bg-blue-500 p-1 rounded-lg"
          >
            {" "}
            Make a new note
          </button>
        </div>

        {/* Form for creating a new note */}
        {isCreating && (
          <div className="mt-2">
            {error && (
              <div className="text-white bg-red-500 p-2 rounded-lg mb-2 flex flex-row items-center justify-between lg:w-1/3 md:w-1/2">
                {error}
                <button
                  onClick={() => setError(false)}
                  className="hover:bg-white hover:text-red-500 rounded-lg"
                >
                  <XMarkIcon className="h-8" />
                </button>
              </div>
            )}
            <div className="flex flex-col gap-y-2">
              <div className="flex flex-row gap-x-2">
                <input
                  type="text"
                  value={newNote.title}
                  placeholder="Title"
                  onChange={(e) =>
                    setNewNote({ ...newNote, title: e.target.value })
                  }
                  className="border p-2 bg-black text-neutral-400 w-full"
                />
                <button
                  onClick={handleSaveNote}
                  className="bg-green-500 hover:bg-green-400 text-white p-2"
                >
                  <CheckCircleIcon className="h-6" />
                </button>
                <button
                  onClick={handleCancelEdit}
                  className="bg-gray-500 hover:bg-red-400 duration-200 text-white p-2"
                >
                  <NoSymbolIcon className="h-6" />
                </button>
              </div>
              <textarea
                value={newNote.contents}
                placeholder="Contents"
                onChange={(e) =>
                  setNewNote({ ...newNote, contents: e.target.value })
                }
                className="border p-2 mb-2 bg-black text-neutral-400 h-[30rem]"
              />
            </div>
          </div>
        )}

        {/* List of notes */}
        {notes.map((note, index) => (
          <div key={note.id} className="p-4">
            <div className="text-xl bg-neutral-900 p-2 rounded-md">
              {editNoteIndex === index ? (
                // Show editor only for the note being edited
                <div>
                  <div className="flex flex-col gap-y-2">
                    <div className="flex flex-row gap-x-2">
                      <input
                        type="text"
                        value={newNote.title}
                        placeholder="Title"
                        onChange={(e) =>
                          setNewNote({ ...newNote, title: e.target.value })
                        }
                        className="border p-2 bg-black text-neutral-400 w-full"
                      />
                      <button
                        onClick={handleSaveNote}
                        className="bg-green-500 hover:bg-green-400 text-white p-2"
                      >
                        <CheckCircleIcon className="h-6" />
                      </button>
                      <button
                        onClick={handleCancelEdit}
                        className="bg-gray-500 hover:bg-red-400 duration-200 text-white p-2"
                      >
                        <NoSymbolIcon className="h-6" />
                      </button>
                    </div>
                    <textarea
                      value={newNote.contents}
                      placeholder="Contents"
                      onChange={(e) =>
                        setNewNote({ ...newNote, contents: e.target.value })
                      }
                      className="border p-2 mb-2 bg-black text-neutral-400 h-[30rem]"
                    />
                  </div>
                </div>
              ) : (
                // Otherwise, show the note title and content
                <>
                  <div className="flex flex-row gap-x-6 items-center">
                    {note.title}
                    <button onClick={() => handleEditNote(index)}>
                      <PencilSquareIcon className="h-8 text-green-500 hover:text-green-400 hover:bg-neutral-700 rounded-lg" />
                    </button>
                    <button onClick={() => confirmDeleteNote(note.id)}>
                      <TrashIcon className="h-8 text-red-500 hover:text-red-400 hover:bg-neutral-700 rounded-lg" />
                    </button>
                  </div>
                </>
              )}
            </div>

            <div className="p-2 text-lg">
              {editNoteIndex !== index ? (
                <>
                  <p>
                    <span>Created on:</span> {note.creationDate}
                  </p>
                  <p>{note.contents}</p>
                </>
              ) : null}
            </div>
          </div>
        ))}

        {/* Delete Confirmation Modal */}
        {noteToDelete !== null && (
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
        )}
      </div>
    </>
  );
}
