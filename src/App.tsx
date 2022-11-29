import {Routes, Route, Navigate} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Container } from 'react-bootstrap'
import NewNote from './components/NewNote'
import { NoteData, RawNote, Tag } from './types'
import { useLocalStorage } from './useLocalStorage'
import { useMemo } from 'react'
import { v4 as uuidV4 } from 'uuid'
import NoteList from './components/NoteList'
import NoteLayout from './components/NoteLayout'
import Note from './components/Note'
import EditNote from './components/EditNote'


function App() {
  const [notes, setNotes] = useLocalStorage<RawNote[]>("NOTES", [])
  const [tags, setTags] = useLocalStorage<Tag[]>("TAGS", [])

  const notesWithTags = useMemo(() => {
    return notes.map(note => {
      return { ...note, tags: tags.filter(tag => note.tagIds.includes(tag.id)) }
    })
  }, [notes, tags])

  function onCreateNote ({tags, ...data}: NoteData) {
    setNotes(prevNotes => {
      return [
          ...prevNotes, {
            ...data,
            id: uuidV4(),
            tagIds: tags.map(tag => tag.id)
        }
      ]
    })
  }

  function onUpdateNote (id: string, {tags, ...data}: NoteData) {
    setNotes(prevNotes => {
      return prevNotes.map(note => {
        if (note.id !== id) return note

        return {
          ...note,
          ...data,
          tagIds: tags.map(tag => tag.id)
        }
      })
    })
  }


  function addTag (newTag: Tag) {
    setTags(prev => [...prev, newTag])
  }

  return (
    <Container className='my-4'>
      <Routes>
        <Route path='/' element={
          <NoteList notes={notesWithTags} availableTags={tags} />
        } />
        <Route path='/new' element={
          <NewNote 
            onSubmit={onCreateNote} 
            onAddTag={addTag}
            availableTags={tags} />
          } />
        <Route path='/:id' element={<NoteLayout notes={notesWithTags} />}> 
          <Route index element={<Note />} />
          <Route path='edit' element={<EditNote 
            onSubmit={onUpdateNote} 
            onAddTag={addTag}
            availableTags={tags} />} />
        </Route>
        <Route path='*' element={<Navigate to='/' />} />
      </Routes>
    </Container>
  )
}

export default App
