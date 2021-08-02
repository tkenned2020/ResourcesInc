import { useEffect, useState, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { editMaterial } from "../store/material";

export default function EditMaterialForm() {
  const dispatch = useDispatch();
  const material = useSelector(state => state.material)

  const [title, setTitle] = useState("");
  const [subject, setSubject] = useState("");
  const [synopsis, setSynopsis] = useState("");
  const [content, setContent] = useState("");



}
