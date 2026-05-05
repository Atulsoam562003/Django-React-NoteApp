import { useState, useEffect } from 'react';
import api from "../api"
import Note from '../components/Note';
import "../styles/Home.css"

function Home() {
    const [notes, setNotes] = useState([]);
    const [content, setContent] = useState("");
    const [title, setTitle] = useState("");

    useEffect(() => {
        getNotes();
    }, []);

    const getNotes = async () => {
        const res = await api.get('/api/notes/');
        setNotes(res.data);
    }

    const deleteNote = async (id) => {
        const res = await api.delete(`/api/notes/delete/${id}/`);
        if (res.status === 204) {
            alert("Note deleted successfully");
        } else {
            alert('Failed to delete note');
        }
        setNotes(notes.filter(note => note.id !== id));
    }

    const createNote = async (e) => {
        e.preventDefault();
        const res = await api.post('/api/notes/', { content, title });
        res.status === 201 ? alert("Note created successfully") : alert("Failed to create note");
        setNotes([...notes, res.data]);
    }

    return <div>
        <div>
            <h2>Notes</h2>
            {notes.map(note => <Note key={note.id} note={note} onDelete={deleteNote} />)}
        </div>
        <h2> Create a Note </h2>
        <form onSubmit={createNote}>
            <lable htmlFor="title">Title:</lable>
            <br />
            <input type="text" id="title" name='title' required onChange={(e) => setTitle(e.target.value)} value={title} />
            <lable htmlFor="content">Content:</lable>
            <br />
            <textarea id='content' name='content' required value={content} onChange={(e) => setContent(e.target.value)}></textarea>
            <br />
            <input type='submit' value="submit"></input>
        </form>

    </div>
}

export default Home;