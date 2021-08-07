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
  const comments = useSelector((state) => Object.values(state.comments.all));
  console.log("what does this useSelector return", materials);
  console.log("what does this useSelector/comments return ", comments);


  useEffect(() => {
    dispatch(getMaterials());
    dispatch(getComments());
  }, [dispatch]);

  return (
    <div className={styles.materialholder} >
      <br />
      {materials.map((material, idx) => (
        <React.Fragment key={idx}>
          <div
            className={styles.singlematerial}
            style={{ border: "solid", marginBottom: "12px" }}

          >
            <h2>
              <NavLink to={`/materials/${material.id}`}>
                {material.title}
              </NavLink>{" "}
            </h2>
            <div>
              <h3>
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
                    ? "Software_Development"
                    : null || material.subjectId === 7
                    ? "Construction"
                    : null || material.subjectId === 8
                    ? "Agriculture"
                    : null}
                </strong>
              </h3>
            </div>
            <div>
              <h4>{material.synopsis}</h4>
            </div>
            <div>
              <p>{material.content}</p>
            </div>
            <div>
              {material.citation === null
                ? "Citations belong here"
                : material.citation}
            </div>
            <div>
              constructed by:{" "}
              <strong>
                {material.userId === 1
                  ? "JacksonW21"
                  : null || material.userId === 2
                  ? "MarcusG44"
                  : null || material.userId === 3
                  ? "DemoUser"
                  : null}
              </strong>
            </div>
            <br />
          </div>

          <div>
            {material.comments.map((comment) => (
              <div styles={{ backgroundColor: "red" }} key={comment.id}>
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
                {comment.comment}
                <button>edit</button> <button>delete</button>
              </div>
            ))}
          </div>
        </React.Fragment>
      ))}
      <br />
    </div>
  );
}
//
