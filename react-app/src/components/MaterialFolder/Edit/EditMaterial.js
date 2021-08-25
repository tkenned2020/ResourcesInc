import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { editMaterial, singleMaterial } from "../../../store/material";
import {  useHistory } from "react-router-dom";
import styles from './EditMaterial.module.css'


export default function EditMaterialForm() {
  const history = useHistory();
  const dispatch = useDispatch();
  const { materialId } = useParams();
  const material = useSelector((state) => state.material.current);
  console.log("state => state.material", material);

  const [title, setTitle] = useState("");
  const [subject, setSubject] = useState("");
  const [synopsis, setSynopsis] = useState("");
  const [content, setContent] = useState("");
  const [citation, setCitation] = useState("");
  const [errors, setErrors] = useState([]);

  const editSubmit = async (e) => {
    e.preventDefault();
    const data = await dispatch(
      editMaterial({
        id: Number(materialId),
        title,
        subject,
        synopsis,
        content,
        citation,
      })
    );
    if (data) setErrors(data);

    if (material) {
      return history.push(`/materials/${Number(materialId)}`)
    }
  };

  useEffect(() => {
    if (material) {
      setTitle(material.title);
      setSubject(material.subject);
      setSynopsis(material.synopsis);
      setContent(material.content);
      setCitation(material.citation);
    } else {
      dispatch(singleMaterial(Number(materialId)));
    }
  }, [dispatch, materialId, material]);

  // useEffect(() => {

  //   if (!title) {
  //     errors.push("title needs to be provided");
  //   }
  //   if (!subject) {
  //     errors.push("subject needs to be provided");
  //   }
  //   if (!synopsis) {
  //     errors.push("synopsis needs to be provided");
  //   }
  //   if (!content) {
  //     errors.push("content needs to be provided");
  //   }
  //   if (!citation) {
  //     errors.push("citation needs to be provided");
  //   }

  //   // setErrors(errorArray);
  // }, [errors, title, subject, synopsis, content, citation]);

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
//         {errors && errors.map((error, ind) => <div key={ind}>{error}</div>)}
//       </div>
  return (
    <div className={styles.editContainer}>
      <form className={styles.formContainer} onSubmit={editSubmit}>
        <div className={styles.inputContainer}>
        <div className={styles.formTitle}><label style={{ fontSize: "27px"}}>Edit Expertise Below</label></div>
          <div>
          <label>Title</label>
            <br />
            <input
              type="text"
              name="Title"
              onChange={updateTitle}
              value={title}
              required={true}
            ></input>
          </div>
          <div>
            <label>Subject</label>
            <br />
            <select value={subject}
              placeholder="subject"
              required={true}
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
            <br />
            <textarea
              type="text"
              name="synopsis"
              required={true}
              onChange={updateSynopsis}
              value={synopsis}
            ></textarea>
          </div>
          <div>
            <label>Content</label>
            <br />
            <textarea
              type="text"
              name="Content"
              onChange={updateContent}
              value={content}
              required={true}
            ></textarea>
          </div>
          <div>
            <label>Citation</label>
            <br />
            <textarea
              type="text"
              name="Citation"
              onChange={updateCitation}
              value={citation}
            ></textarea>
          </div>
        <button className={styles.btn} type="submit">Update Article</button>
        </div>
      </form>
    </div>
  );
}
