import { useState,useEffect } from "react";
import axios from "axios";

function App() {
  //state

  const [notes,setNotes]=useState(null)
const [createForm,setCreateForm]= useState({
  title: '',
  body: ''
});

//useEffect
  useEffect(()=>{
    fetchNotes();
  },[])

  //functions
  const fetchNotes=async()=>{
    //fetch
    const res= await axios.get('http://localhost:3000/notes');
    //set
    setNotes(res.data.notes)
  }

  const updateCreateFormField=(e)=>{
    const {name,value}=e.target;
    setCreateForm({
      ...createForm,
      [name]: value
    })
  }

  const createNote=async(e)=>{
    e.preventDefault();

    const res= await axios.post("http://localhost:3000/notes",createForm)

    setNotes([...notes,res.data.note])
    console.log(res);
    setCreateForm({title:'',body:''})
  }
  return (
    <div className="App">
      <h2>NOTES:</h2>
      {
        notes && notes.map(note=>{
          return (
          <div key={note.id}>
            <h3>{note.title}</h3>
          </div>
            )
        })
      }
    
    <div>
      <h2>Create Note</h2>
      <form onSubmit={createNote}>
        
        <input onChange={updateCreateFormField} value={createForm.title} name="title"/>
        <textarea onChange={updateCreateFormField} value={createForm.body} name="body"/>
        <button type="submit">Create Note</button>
      </form>
    </div>
    </div>
  );
}

export default App;
