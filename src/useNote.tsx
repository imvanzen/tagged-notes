import { useOutletContext } from "react-router-dom";
import { Note } from "./types";

export default function useNote() {
    return useOutletContext<Note>()
}