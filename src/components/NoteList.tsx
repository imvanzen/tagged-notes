import { useMemo, useState } from "react"
import { Button, Col, Form, Row, Stack } from "react-bootstrap"
import { Link } from "react-router-dom"
import ReactSelect from "react-select"
import { Note, RawNote, Tag } from "../types"
import NoteCard from "./NoteCard"

type NoteListProps = {
    notes: Note[]
    availableTags: Tag[]
}

const NoteList = ({notes, availableTags}: NoteListProps) => {
    const [title, setTitle] = useState("")
    const [selectedTags, setSelectedTags] = useState<Tag[]>([])

    const filteredNotes = useMemo(() => {
        return notes.filter(note => {
            return (title === "" || note.title.toLowerCase().includes(title.toLowerCase()))
            && (selectedTags.length === 0 || selectedTags.every(tag => note.tags.some(noteTag => noteTag.id === tag.id)))
        })
    }, [title, selectedTags, notes])

    return (
        <>
            <Row className="align-items-center mb-4">
                <Col>
                    <h1>Notes</h1>
                </Col>
                <Col xs="auto">
                    <Stack gap={2} direction="horizontal">
                        <Link to="/new">
                            <Button variant="primary">Create</Button> 
                        </Link>
                        <Button variant="outline-secondary">Edit Tags</Button> 
                    </Stack>
                </Col>
            </Row>
            <Form>
                <Row className="mb-4"> 
                    <Col>
                        <Form.Group controlId="title">
                            <Form.Label>Title</Form.Label>
                            <Form.Control type="text" value={title} onChange={e => setTitle(e.target.value)} />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="tags">
                            <Form.Label>Tags</Form.Label>
                            <ReactSelect isMulti 
                                options={availableTags.map(tag => {
                                    return {
                                        value: tag.id,
                                        label: tag.label
                                    }
                                })}
                                value={selectedTags.map(tag => {
                                    return {
                                        label: tag.label,
                                        value: tag.id
                                    }
                                })} 
                                onChange={(tags) => {
                                    setSelectedTags(tags.map(tag => {
                                        return {
                                            label: tag.label,
                                            id: tag.value
                                        }
                                    }))
                                }} />
                        </Form.Group>
                    </Col>
                </Row>
            </Form>
            <Row xs={1} sm={2} lg={3} xl={4} className="g-3">
                {filteredNotes.map(note => (
                    <Col key={note.id}>
                        <NoteCard 
                            id={note.id} 
                            title={note.title} 
                            tags={note.tags} />
                    </Col>
                ))}
            </Row>
        </>
    )
}

export default NoteList