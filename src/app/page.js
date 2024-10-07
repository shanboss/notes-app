"use client";
import React, { useState, useEffect } from "react";
import NoteForm from "@/components/NoteForm";
import DeleteModal from "@/components/DeleteModal";
import ServeNotes from "@/components/ServeNotes";
import { supabase } from "../../lib/supabaseClient";
import { cloneDeep } from "lodash";

export default function Page() {
  const [notes, setNotes] = useState([]);
  useEffect(() => {
    const channel = supabase
      .channel("table-db-changes")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "notes",
        },
        (payload) => {
          console.log(payload);
          if (payload.eventType == "INSERT") {
            const newNote = payload?.new;
            console.log("This is a new note ", newNote);
            setNotes([newNote, ...notes]);
          } else if (payload.eventType == "UPDATE") {
            const noteIndex = notes.findIndex(
              (note) => (note.id = payload.new.id)
            );
            console.log(noteIndex);
            const tempNotes = cloneDeep(notes);
            tempNotes.splice(noteIndex, 1, payload.new);
            setNotes(tempNotes);
          } else if (payload.eventType == "DELETE") {
            setNotes(notes.filter((note) => note.id != payload.old.id));
          }
        }
      )
      .subscribe();
    // Cleanup the subscription on component unmount
    return () => {
      supabase.removeChannel(channel);
    };
  }, [notes]);

  const fetchNotes = async () => {
    const { data, error } = await supabase.from("notes").select("*");
    if (error) {
      console.error("Error fetching notes:", error);
    } else {
      setNotes(data); // Set fetched notes to state
    }
  };
  // Fetch notes on component mount
  useEffect(() => {
    fetchNotes(); // Call the function when component mounts
  }, []); // Empty dependency array ensures this runs only once when component

  const [newNote, setNewNote] = useState({
    id: null,
    title: "",
    creationDate: "",
    contents: "",
  });
  const [editNoteIndex, setEditNoteIndex] = useState(null);
  const [noteToDelete, setNoteToDelete] = useState(null);
  const [isCreating, setIsCreating] = useState(false);
  const [error, setError] = useState(null);

  const handleSaveNote = async () => {
    if (!newNote.title.trim() || !newNote.contents.trim()) {
      setError("Both title and content are required.");
      return;
    }

    setError(null);

    if (editNoteIndex === null) {
      // Insert the new note and request all columns of the inserted row(s)
      const { data, error } = await supabase
        .from("notes")
        .insert([
          {
            title: newNote.title,
            contents: newNote.contents,
            creationDate: new Date().toISOString().split("T")[0],
          },
        ])
        .select("*"); // This tells Supabase to return the newly inserted data

      console.log("Inserted Data:", data); // Check the inserted data

      if (error) {
        console.error("Error inserting note:", error);
      }
    } else {
      // Update an existing note
      const { error } = await supabase
        .from("notes")
        .update({
          title: newNote.title,
          contents: newNote.contents,
        })
        .eq("id", editNoteIndex);

      if (error) {
        console.error("Error updating note:", error);
      }
    }

    setNewNote({ id: null, title: "", creationDate: "", contents: "" });
    setEditNoteIndex(null);
    setIsCreating(false);
  };

  const handleEditNote = (id) => {
    const noteToEdit = notes.find((note) => note.id === id);
    setNewNote(noteToEdit);
    setEditNoteIndex(id);
    setIsCreating(true);
  };

  const confirmDeleteNote = (id) => {
    setNoteToDelete(id);
  };

  const cancelDeleteNote = () => {
    setNoteToDelete(null);
  };

  const handleDeleteNote = async () => {
    const { error } = await supabase
      .from("notes")
      .delete()
      .eq("id", noteToDelete);

    if (error) {
      console.error("Error deleting note:", error);
    }
    setNoteToDelete(null);
  };

  const handleCreate = () => {
    setNewNote({ id: null, title: "", creationDate: "", contents: "" });
    setEditNoteIndex(null);
    setIsCreating(true);
  };

  const handleCancelEdit = () => {
    setNewNote({ id: null, title: "", creationDate: "", contents: "" });
    setEditNoteIndex(null);
    setIsCreating(false);
  };

  return (
    <div className="p-4 text-2xl rounded-lg">
      <div className="flex flex-row gap-x-2 border-b p-2 justify-between">
        <p>Your Notes -</p>
        <button
          onClick={handleCreate}
          className="hover:bg-blue-500 p-1 rounded-lg"
        >
          Make a new note
        </button>
      </div>

      {isCreating && (
        <NoteForm
          newNote={newNote}
          setNewNote={setNewNote}
          handleSaveNote={handleSaveNote}
          handleCancelEdit={handleCancelEdit}
          error={error}
          setError={setError}
        />
      )}
      <ServeNotes
        notes={notes}
        handleEditNote={handleEditNote}
        confirmDeleteNote={confirmDeleteNote}
      />
      {/**
      <NoteList
        notes={notes}
        handleEditNote={handleEditNote}
        confirmDeleteNote={confirmDeleteNote}
      />
       */}

      {noteToDelete !== null && (
        <DeleteModal
          noteToDelete={noteToDelete}
          handleDeleteNote={handleDeleteNote}
          cancelDeleteNote={cancelDeleteNote}
        />
      )}
    </div>
  );
}
