const Note=require("../models/note")
const fetchNotes=async(req,res)=>{
    //find notes
    const notes=await Note.find();
    //respond to them
    res.json({notes});
}
const fetchNote=async (req,res)=>{
    //get id off url
    const noteId=req.params.id;

    //find id
    const note = await Note.findById(noteId)
    //respond
    res.json({note})
}

const createNote=async (req,res)=>{
    //Get the sent in data of req body
    const{title,body}=req.body;

    //create a note with it
    const note= await Note.create({
        title,
        body,
    })
    //respond with the newnote
    res.json({note})
}

const updateNote=async(req,res)=>{
    //get id
    const noteId=req.params.id
    //get data off req body
    const {title,body}=req.body;
    //find update
    await Note.findByIdAndUpdate(noteId,{
        title,
        body
    })
    //find updated
    const note= await Note.findById(noteId)
    //respond
    res.json({note})
}
const deleteNote=async (req,res)=>{
    //find id
    const noteId=req.params.id;
    //delete
    await Note.deleteOne({_id:noteId});

    //respond
    res.json({success:"Record Deleted"});
}

module.exports={
    fetchNote,
    fetchNotes,
    createNote,
    updateNote,
    deleteNote
}