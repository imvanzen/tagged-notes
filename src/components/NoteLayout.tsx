import { Navigate, Outlet, useParams } from "react-router-dom"
import { Note } from "../types"

type NoteLayoutProps = {
    notes: Note[]
}

const NoteLayout = ({notes}: NoteLayoutProps) => {
    const { id } = useParams()
    const note = notes.find(n => n.id === id)

    if (!note) return <Navigate to="/" replace />

    return <Outlet context={note} />
}

export default NoteLayout