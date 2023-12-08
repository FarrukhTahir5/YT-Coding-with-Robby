import { create } from 'zustand'
import axios from 'axios';
const notesStore = create((set) => ({
    notes:null,
    fetchNotes: async()=>{
        //fetch
    const res = await axios.get('http://localhost:3000/notes');
    //set
    set({
        notes:res.data.notes,
    });
    }
}))

export default notesStore;