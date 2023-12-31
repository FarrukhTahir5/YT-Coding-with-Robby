import { useState, useEffect } from "react";
import axios from "axios";
import notesStore from "../stores/notesStore";

function App() {
  const store = notesStore();

  //state

  const [notes, setNotes] = useState(null);
  const [createForm, setCreateForm] = useState({
    title: '',
    body: ''
  });

  const [updateForm, setUpdateForm] = useState({
    _id: null,
    title: "",
    body: "",
  });


  //useEffect
  useEffect(() => {
    store.fetchNotes();
  }, [])

  //functions
  const fetchNotes = async () => {
    //fetch
    const res = await axios.get('http://localhost:3000/notes');
    //set
    setNotes(res.data.notes)
  };

  const updateCreateFormField = (e) => {
    const { name, value } = e.target;
    setCreateForm({
      ...createForm,
      [name]: value
    })
  };

  const createNote = async (e) => {
    e.preventDefault();

    const res = await axios.post("http://localhost:3000/notes", createForm);
    setNotes([...notes, res.data.note])
    console.log(res);
    setCreateForm({ title: "", body: "" });
  };

  const deleteNote = async (_id) => {
    //delete note
    const res = await axios.delete(`http://localhost:3000/notes/${_id}`);
    //update state
    const newNotes = [...notes].filter((note) => {
      return note._id !== _id
    })
    setNotes(newNotes);
  };
  const handleUpdateFieldChange = (e) => {
    const { value, name } = e.target
    setUpdateForm({
      ...updateForm,
      [name]: value
    });
  }
  const toggleUpdate = (note) => {
    setUpdateForm({ title: note.title, body: note.body, _id: note._id })
    //set state
  };

  const updateNote = async (e) => {
    e.preventDefault();
    const { title, body } = updateForm;
    //upd req
    const res = await axios.put(`http://localhost:3000/notes/${updateForm._id}`, { title, body })
    //upd state
    const newNotes = [...notes]
    const noteIndex = notes.findIndex((note) => {
      return note._id === updateForm._id;
    });
    newNotes[noteIndex] = res.data.note;
    setNotes(newNotes);
    setUpdateForm({
      _id: null,
      title: "",
      body: "",
    })
  };
  return (
    <div className="App">
      <h2>NOTES:</h2>
      {
        store.notes && store.notes.map(note => {
          return (
            <div key={note.id}>
              <h3>{note.title}</h3>
              <button onClick={() => deleteNote(note._id)}>Delete Note</button>
              <button onClick={() => toggleUpdate(note)}>Update Note</button>
            </div>
          )
        })
      }
      {updateForm._id && (
        <div>
          <h2>Update note</h2>
          <form onSubmit={updateNote}>
            <input onChange={handleUpdateFieldChange} value={updateForm.title} name="title" />
            <textarea onChange={handleUpdateFieldChange} value={updateForm.body} name="body" />
            <button type="submit">Update note</button>

          </form>
        </div>)}
      {!updateForm._id && (
        <div>
          <h2>Create Note</h2>
          <form onSubmit={createNote}>

            <input onChange={store.updateCreateFormField} value={store.createForm.title} name="title" />
            <textarea onChange={store.updateCreateFormField} value={store.createForm.body} name="body" />
            <button type="submit">Create Note</button>
          </form>

        </div>
      )}


    </div>
  );
}

export default App;
