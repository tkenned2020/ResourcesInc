import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { editMaterial } from "../store/material";
import Dropdown from "./Dropdown";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";



export default function EditMaterialForm() {
  const dispatch = useDispatch();
  const { materialId } = useParams()
  const material = useSelector(state => state.material)
  console.log("state => state.material", material)

  const [title, setTitle] = useState("");
  const [subject, setSubject] = useState("");
  const [synopsis, setSynopsis] = useState("");
  const [content, setContent] = useState("");
  const [citation, setCitation] = useState("");
  const [erorrs, setErrors] = useState([])

  const editSubmit = async e => {
    e. preventDefault()
    const data = await dispatch(editMaterial(title, subject, synopsis, content, citation));
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
  const updateCitation = (e) => {
    setCitation(e.target.value);
  };
// <div>
//         {errors.map((error, ind) => (
//           <div key={ind}>{error}</div>
//         ))}
//       </div>
  // if(material) {return <Redirect to='/materials/:materialId'/>}

  return (
    <form onSubmit={editSubmit}>

      <div>
        <label>Title</label>
        <br/>
        <input
          type='text'
          name='Title'
          onChange={updateTitle}
          value={title}
        ></input>
      </div>
      <div>
        <label>Subject</label>
        <br/>
        <input
          type='text'
          name='Subject'
          onChange={updateSubject}
          value={subject}
        ></input>
      </div>
      <div>
        <label>synopsis</label>
        <br/>
        <input
          type='text'
          name='synopsis'
          onChange={updateSynopsis}
          value={synopsis}
        ></input>
      </div>
      <div>
        <label>Content</label>
        <br/>
        <input
          type='text'
          name='Content'
          onChange={updateContent}
          value={content}
        ></input>
      </div>
      <div>
        <label>Citation</label>
        <br/>
        <input
          type='text'
          name='Citation'
          onChange={updateCitation}
          value={citation}
        ></input>
      </div>

      <button type='submit'>Update Documentation</button>
    </form>
  )


}
