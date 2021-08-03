import { useEffect, useHistory } from "react-router-dom";
import { useState } from 'react'
import { useSelector, useDispatch } from "react-redux";
import { editMaterial } from "../store/material";

export default function EditMaterialForm() {
  const dispatch = useDispatch();
  const material = useSelector(state => state.material)
  const material1 = useSelector(state => state.material.material)
  console.log("state => state.material",material)
  console.log("state => state.material.material",material1)

  const [title, setTitle] = useState("");
  const [subject, setSubject] = useState("");
  const [synopsis, setSynopsis] = useState("");
  const [content, setContent] = useState("");
  const [erorrs, setErrors] = useState("")

  const editSubmit = async e => {
    e. preventDefault()
    const data = await dispatch(editMaterial(title, subject, synopsis, content));
    if (data) setErrors(data)
  };


  const updateTitle = (e) => {
    setTitle(e.target.value);
  };
  const updateSubject = (e) => {
    setSubject(e.target.value);
  };
  const updateSynopsis = (e) => {
    setSynopsis(e.target.value);
  };
  const updateContent = (e) => {
    setContent(e.target.value);
  };




}
