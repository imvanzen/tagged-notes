import { Button, Col, Form, Modal, Row, Stack } from "react-bootstrap"
import { Tag } from "../types"

type EditTagsModalProps = {
    availableTags: Tag[]
    show: boolean
    handleClose: () => void
    onUpdateTag: (tag: Tag) => void
    onDeleteTag: (id: string) => void
}

const EditTagsModal = ({
    availableTags, 
    show, 
    handleClose,
    onUpdateTag,
    onDeleteTag
}: EditTagsModalProps) => {
    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Edit Tags</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Stack gap={2}>
                        {availableTags.map(tag => (
                            <Row key={tag.id}>
                                <Col>
                                    <Form.Control type="text" value={tag.label} onChange={e => onUpdateTag({id: tag.id, label: e.target.value})} />
                                </Col>
                                <Col xs="auto">
                                    <Button variant="outline-danger" onClick={() => onDeleteTag(tag.id)}>&times;</Button>
                                </Col>
                            </Row>
                        ))}
                    </Stack>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Row>
                    <Col className="justify-content-end">
                        <Button variant="primary" onClick={handleClose}>Close</Button>
                    </Col>
                </Row>
            </Modal.Footer>
        </Modal>
    )
}

export default EditTagsModal