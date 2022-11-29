import { Button, Col, Form, Row, Stack } from "react-bootstrap"
import { Link } from "react-router-dom"
import CreatebleReactSelect from "react-select/creatable"

function NoteFrom () {
    return (
        <Form>
            <Stack gap={4}>
                <Row>
                    <Col>
                        <Form.Group controlId="Title">
                            <Form.Label>Title</Form.Label>
                            <Form.Control required />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="tags">
                            <Form.Label>Tags</Form.Label>
                            <CreatebleReactSelect isMulti />
                        </Form.Group>
                    </Col>
                </Row>
                <Form.Group controlId="markdown">
                    <Form.Label>Body</Form.Label>
                    <Form.Control required as="textarea" rows={15} />
                </Form.Group>
                <Stack direction="horizontal" gap={2} className="justify-content-end">
                    <Button type="submit" variant="primary">
                        Save
                    </Button>
                    <Link to="..">
                        <Button type="button" variant="outline-secondary">
                            Cancel
                        </Button>
                    </Link>
                </Stack>
            </Stack>
        </Form>
    )
}

export default NoteFrom