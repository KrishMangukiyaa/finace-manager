import { useState, useEffect } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { FaTrash, FaEdit, FaPlus } from "react-icons/fa";

export default function Notes() {
  const [notes, setNotes] = useState(() => {
    return JSON.parse(localStorage.getItem("finance-notes")) || [];
  });

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [editIndex, setEditIndex] = useState(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    localStorage.setItem("finance-notes", JSON.stringify(notes));
  }, [notes]);

  const handleAddNote = () => {
    if (!title.trim() || !description.trim()) return;

    if (editIndex !== null) {
      const updatedNotes = [...notes];
      updatedNotes[editIndex] = { title, description };
      setNotes(updatedNotes);
      setEditIndex(null);
    } else {
      setNotes([...notes, { title, description }]);
    }

    setTitle("");
    setDescription("");
  };

  const handleDeleteNote = (index) => {
    setNotes(notes.filter((_, i) => i !== index));
  };

  const handleEditNote = (index) => {
    setTitle(notes[index].title);
    setDescription(notes[index].description);
    setEditIndex(index);
  };

  // Filter notes based on search query
  const filteredNotes = notes.filter((note) =>
    note.title.toLowerCase().includes(search.toLowerCase()) ||
    note.description.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <NotesStyled>
      <motion.div className="notes-container">
        <h2>Finance Notes</h2>

        {/* Search Bar */}
        <input
          type="text"
          placeholder="Search notes..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="search-bar"
        />

        <div className="note-input">
          <input
            type="text"
            placeholder="Title..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            placeholder="Write your financial notes here..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <button onClick={handleAddNote}>
            {editIndex !== null ? <FaEdit /> : <FaPlus />} {editIndex !== null ? "Update" : "Add"} Note
          </button>
        </div>

        <div className="notes-list">
          {filteredNotes.map((note, index) => (
            <motion.div key={index} className="note-item">
              <div className="note-content">
                <h3>{note.title}</h3>
                <p>{note.description}</p>
              </div>
              <div className="note-actions">
                <FaEdit className="edit-icon" onClick={() => handleEditNote(index)} />
                <FaTrash className="delete-icon" onClick={() => handleDeleteNote(index)} />
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </NotesStyled>
  );
}

const NotesStyled = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: linear-gradient(135deg, rgb(89, 0, 255), rgb(0, 144, 221), rgb(123, 200, 255));
  padding: 2rem;

  .notes-container {
    width: 90%;
    max-width: 1200px;
    background: rgba(255, 255, 255, 0.15);
    backdrop-filter: blur(10px);
    padding: 2rem;
    border-radius: 15px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
    text-align: center;
  }

  h2 {
    color: #fff;
  }

  .search-bar {
    width: 100%;
    padding: 0.8rem;
    border-radius: 10px;
    border: none;
    font-size: 1rem;
    margin-bottom: 1rem;
  }

  .note-input {
    display: flex;
    flex-direction: column;
    gap: 0.8rem;
    margin-bottom: 1rem;
  }

  input, textarea {
    width: 100%;
    padding: 0.8rem;
    border-radius: 10px;
    border: none;
    font-size: 1rem;
  }

  textarea {
    resize: none;
    height: 80px;
  }

  button {
    background: rgb(123, 248, 255);
    color: white;
    padding: 0.8rem;
    border-radius: 10px;
    font-size: 1rem;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    border: none;
    font-weight: bold;
  }

  .notes-list {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    grid-auto-rows: minmax(100px, auto);
    gap: 1rem;
    max-height: 400px;
    overflow-y: auto;
    padding: 1rem 0;
  }

  .note-item {
    background: rgba(255, 255, 255, 0.2);
    padding: 1rem;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    min-height: 100px;
  }

  .note-content {
    text-align: left;
    flex: 1;
  }

  h3 {
    margin: 0;
    font-size: 1.2rem;
    color: #fff;
  }

  p {
    font-size: 0.9rem;
    color: #ddd;
    margin: 0.5rem 0 0;
  }

  .note-actions {
    display: flex;
    justify-content: space-between;
    margin-top: 0.5rem;
  }
`;
