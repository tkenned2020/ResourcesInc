import React, { useState, useEffect  } from 'react';
import { useDispatch } from 'react-redux';
import { createMaterial } from "../../../store/material";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import styles from './CreateMaterial.module.css'


export default function CreatesMaterialForm() {
  const history = useHistory();
  const dispatch = useDispatch();

  const [title, setTitle] = useState("");
  const [subject, setSubject] = useState("");
  const [synopsis, setSynopsis] = useState("");
  const [content, setContent] = useState("");
  const [citation, setCitation] = useState("");
  const [erorrs, setErrors] = useState([])

  const createSubmit = e => {
    e.preventDefault()
    const data = dispatch(createMaterial({title, subject, synopsis, content, citation}, history));
    if (data) setErrors(data)
  };


  useEffect(() => {
    const errorArray = [];
    if (!title) {
      errorArray.push("title needs to be provided");
    }
    if (!subject) {
      errorArray.push("subject needs to be provided");
    }
    if (!synopsis) {
      errorArray.push("synopsis needs to be provided");
    }
    if (!content) {
      errorArray.push("content needs to be provided");
    }
    if (!citation) {
      errorArray.push("citation needs to be provided");
    }

    setErrors(errorArray);
  }, [title, subject, synopsis, content, citation]);


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
    <div className={styles.editContainer}>

      <form className={styles.formContainer} onSubmit={createSubmit}>
        <div className={styles.inputContainer}>
        <div className={styles.formTitle}><label style={{ fontSize: "27px"}}>Expertise Belongs Below</label></div>
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
            <select value={subject}
              placeholder="subject"
              onChange={updateSubject}
              >
              <option value=''></option>
              <option value={1}>Art</option>
              <option value={2}>Mathematics</option>
              <option value={3}>Welding</option>
              <option value={4}>Automotive</option>
              <option value={5}>Psychology</option>
              <option value={6}>Software Development</option>
              <option value={7}>Construction</option>
              <option value={8}>Agriculture</option>
            </select>
          </div>
          <div>
            <label>Synopsis</label>
            <br/>
            <textarea
              type='text'
              name='synopsis'
              onChange={updateSynopsis}
              value={synopsis}
            ></textarea>
          </div>
          <div>
            <label>Content</label>
            <br/>
            <textarea
              type='text'
              name='Content'
              onChange={updateContent}
              value={content}
            ></textarea>
          </div>
          <div>
            <label>Citation</label>
            <br/>
            <textarea
              type='text'
              name='Citation'
              onChange={updateCitation}
              value={citation}
            ></textarea>
          </div>
          <button className={styles.btn} type='submit'>Create Article</button>
        </div>
      </form>
    </div>
  )


}
