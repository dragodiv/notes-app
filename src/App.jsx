import React, { useEffect, useState } from "react"
import Sidebar from "./Sidebar.jsx"
import Editor from "./Editor.jsx"
import Split from "react-split"
// import { nanoid } from "nanoid"
import { addDoc, onSnapshot , doc, deleteDoc, setDoc} from "firebase/firestore"
import './App.css';
import { notescollection , db } from "./Firebase.jsx"

export default function App() {
  const [notes, setNotes] = useState(JSON.parse(localStorage.getItem("notes")) || [])
  // const [notes, setNotes] = useState([])
  const [currentNoteId, setCurrentNoteId] = useState(
    (notes[0] && notes[0].id) || ""
  )

  // onSnapshot() method listens for any changes in a Firestore database and updates the front end automatically without refreshing the page. This is in contrast to the getDocs() method, which requires the browser to be refreshed in order to see any changes.

  useEffect(()=>{
    // localStorage.setItem("notes",JSON.stringify(notes))
    const unsubsribe = onSnapshot(notescollection, (snapshot)=>{
      //sync up our local notes array with the snapshot data
      // console.log("things are changing !!");
      const notesArr = snapshot.docs.map(doc=>({
        ...doc.data(),
        id : doc.id
      }))
      setNotes(notesArr)
    })
    return unsubsribe
    // console.log(notes[0].body.split("\n"))
  // },[notes])
},[])

  async function createNewNote() {
    const newNote = {
      // id: nanoid(),
      body: "Type your markdown note's title here"
    }
    // setNotes(prevNotes => [newNote, ...prevNotes])
    const newNoteRef = await addDoc(notescollection,newNote) //returns a promise
    // setCurrentNoteId(newNote.id)
    setCurrentNoteId(newNoteRef.id)
  }

  // function updateNote(text) {
  //   setNotes(oldNotes => oldNotes.map(oldNote => {
  //     return oldNote.id === currentNoteId
  //       ? { ...oldNote, body: text }
  //       : oldNote
  //   }))
  // }

  // function updateNote(text) {
  //   setNotes(oldNotes => {
  //     const newArray = []
  //     for(let i=0; i < oldNotes.length; i++){
  //       if(oldNotes[i].id === currentNoteId){
  //         newArray.unshift({...oldNotes[i], body: text})
  //       } else{
  //         newArray.push(oldNotes[i])
  //       }
  //     }
  //     return newArray
  //   })
  // }

  async function updateNote(text){
    const docRef = doc(db,"notes",currentNoteId)
    await setDoc(docRef,{body: text}, {merge: true})
  }

  function findCurrentNote() {
    return notes.find(note => {
      return note.id === currentNoteId
    }) || notes[0]
  }

  // function deleteNote(event,noteId){
  //   event.stopPropagation()
  //   console.log("deleted note " , noteId)
  //   setNotes(oldNotes => oldNotes.filter(note => note.id !== noteId))
  // }

  async function deleteNote(noteId){
    const docref = doc(db,"notes",noteId)
    await deleteDoc(docref)
  }

  return (
    <main>
      {
        notes.length > 0
          ?
          <Split
            sizes={[30, 70]}
            direction="horizontal"
            className="split"
          >
            <Sidebar
              notes={notes}
              currentNote={findCurrentNote()}
              setCurrentNoteId={setCurrentNoteId}
              newNote={createNewNote}
              deleteNote = {deleteNote}
            />
            {
              currentNoteId &&
              notes.length > 0 &&
              <Editor
                currentNote={findCurrentNote()}
                updateNote={updateNote}
              />
            }
          </Split>
          :
          <div className="no-notes">
            <h1>You have no notes</h1>
            <button
              className="first-note"
              onClick={createNewNote}
            >
              Create one now
            </button>
          </div>  
      }
    </main>
  )
}
