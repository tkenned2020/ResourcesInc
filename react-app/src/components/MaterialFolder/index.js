import React, { /*useState,*/ useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { getMaterials } from "../../store/material";
import { getComments } from "../../store/comment";
// import { }
import styles from "./Material.module.css";

export default function Material() {
  const dispatch = useDispatch();
  const materials = useSelector((state) => Object.values(state.material.all));


  useEffect(() => {
    dispatch(getMaterials());
    dispatch(getComments());
  }, [dispatch]);

  return (
    <div  className={styles.materialContainer}>
      <br />
      {materials.map((material, idx) => (
        <div key={idx} className={styles.infoContainer}>
          <div
          className={styles.info}
          >
            <h2 className={styles.infoTitle} >
              <NavLink style={{textDecoration: "none"}} to={`/materials/${material.id}`}>
                {material.title}
              </NavLink>
            </h2>
            <div>
              <h3 className={styles.infoSubject}>
                <strong>
                  {material.subjectId === 1
                    ? "Art"
                    : null || material.subjectId === 2
                    ? "Mathematics"
                    : null || material.subjectId === 3
                    ? "Welding"
                    : null || material.subjectId === 4
                    ? "Automotive"
                    : null || material.subjectId === 5
                    ? "Psychology"
                    : null || material.subjectId === 6
                    ? "Software Development"
                    : null || material.subjectId === 7
                    ? "Construction"
                    : null || material.subjectId === 8
                    ? "Agriculture"
                    : null}
                </strong>
              </h3>
            </div>
            <div className={styles.infoSynopsis}>
              <h4>{material.synopsis}</h4>
            </div>
            <div className={styles.infoContentContainer}>
              <p>{material.content}</p>
            </div>
            <div className={styles.infoCitation}>
              {material.citation === null
                ? "Citations belong here"
                : `Citations: ${material.citation}`}
            </div>
            <div className={styles.infoAuthor}>
            <p>Constructed By: </p>
              <strong>
                {material.userId === 1
                  ? "JacksonW21"
                  : null || material.userId === 2
                  ? "MarcusG44"
                  : null || material.userId === 3
                  ? "DemoUser"
                  : null || material.userId === 4
                  ? "TestUser"
                  : null
                }
              </strong>
            </div>
            <br />
          </div>

          <div className={styles.commentContainer}>
            <label>Comment Section</label>
            {material.comments.map((comment) => (

              <div className={styles.infoCommentedSection} key={comment.id}>
                <div className={styles.commentUserName}>
                  {comment.userId === 1
                    ? "JacksonW21"
                    : null || comment.userId === 2
                    ? "MarcusG44"
                    : null || comment.userId === 3
                    ? "DemoUser"
                    : null || comment.userId === 4
                    ? "testUser"
                    : null}
                  stated:
                  <br />
                  </div>
                  {comment.comment}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
//
