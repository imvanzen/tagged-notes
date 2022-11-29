import { useState } from "react"
import { Button, Col, Form, Row, Stack } from "react-bootstrap"
import { Link } from "react-router-dom"
import ReactSelect from "react-select"
import { RawNote, Tag } from "../types"

type NoteListProps = {
    notes: RawNote[],
    availableTags: Tag[]
}

const NoteList = ({notes, availableTags}: NoteListProps) => {
    const [title, setTitle] = useState()
    const [selectedTags, setSelectedTags] = useState<Tag[]>([])

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
        </>
    )
}

export default NoteList