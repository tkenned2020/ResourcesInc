import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useHistory, NavLink } from "react-router-dom";
import { singleMaterial, deleteMaterial } from "../../../store/material";
import {
  createComment,
  editComment,
  deleteComment,
} from "../../../store/comment";
import styles from "./SingleMaterial.module.css";

function SingleMaterial() {
  const history = useHistory();
  const dispatch = useDispatch();
  const { materialId } = useParams();
  const [comment, setComment] = useState("");
  const [visible, setVisible] = useState(false);
  const material = useSelector((state) => state.material.current);
  const user = useSelector((state) => state.session.user);

  useEffect(() => {
    if (materialId) dispatch(singleMaterial(materialId));
  }, [dispatch, materialId]);

  const payload = {
    userId: user.id,
    comments: comment,
    material_documentationId: materialId,
  };

  const handleCreateComment = (e) => {
    e.preventDefault();
    dispatch(createComment(payload, history));
    window.location.reload();
  };


  const handleEditComment = (e) => {
    const currentComment = material.comments.filter(
      (comment) => comment.userId === user.id
    )[0].comment;
    const currentCommentId = material.comments.filter(
      (comment) => comment.userId === user.id
    )[0].id;



    dispatch(
      editComment({
        commentId: currentCommentId,
        materialId: material.id,
        userId: user.id,
        comment: comment
      })
    );
  };

  const handleDeleteComment = (commentId, materialId) => {
    dispatch(deleteComment({ materialId, commentId }, history));
    window.location.reload();
  };

  const handleDeleteMaterial = (e) => {
    e.preventDefault();
    dispatch(deleteMaterial(materialId, history));
  };

  return (
    <div className={styles.singleMaterialContainer}>
      {material && (
        <div key={material.id} className={styles.infoContainer}>
          <br />
          <div className={styles.info} key={material.id}>
            <h2 className={styles.infoTitle}>{material.title}</h2>
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
            <div>
              <h4 className={styles.infoSynopsis}>{material.synopsis}</h4>
            </div>
            <div className={styles.infoContentContainer}>
              <p>{material.content}</p>
            </div>
            <div>
              <div className={styles.infoCitation}>
                {material.citation === null
                  ? "Citations belong here"
                  : `Citatations: ${material.citation}`}
              </div>
            </div>
            <div className={styles.infoAuthor}>
              <p>Constructed By: </p>
              <strong>
                {material.userId === 1
                  ? " JacksonW21"
                  : null || material.userId === 2
                  ? " MarcusG44"
                  : null || material.userId === 3
                  ? " DemoUser"
                  : null || material.userId === 4
                  ? " TestUser"
                  : null}
                {
                  //user.username
                }
              </strong>
            </div>
            <NavLink
              className={styles.infobtn}
              style={{ textDecoration: "none" }}
              to={`/materials/${material.id}/edit`}
            >
              Edit
            </NavLink>
            <button
              className={styles.infobtn}
              type="button"
              onClick={handleDeleteMaterial}
            >
              Delete
            </button>
            <br />
            <div className={styles.commentContainer}>
              {visible === false && (
                <form onSubmit={handleCreateComment}>
                  <label>Comment</label>
                  <textarea
                    name="comment"
                    id="comment"
                    placeholder="Enter your comment"
                    onChange={(e) => setComment(e.target.value)}
                    required
                    rows="10"
                    cols="5"
                  />
                  <button className={styles.btn} type="submit">
                    Comment
                  </button>
                </form>
              )}
            </div>
            {
              <div className={styles.commentContainer}>
                {visible === true && (
                  <form onSubmit={handleEditComment}>
                    <label>Edit Comment</label>
                    <textarea
                      name="comment"
                      id="comment"
                      placeholder="Enter your comment"
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      required
                      rows="10"
                      cols="5"
                    />
                    <button className={styles.btn} onClick={(e) => handleEditComment(e.target.value,
                      )}>
                      Submit
                    </button>
                  </form>
                )}
              </div>
            }
            <br />
          </div>
          {material.comments.length > 0 && (
            <div className={styles.infoCommentedSection}>
              {material.comments.map((comment) => (
                <div styles={{ backgroundColor: "red" }} key={comment.id}>
                  <div className={styles.commentUserName}>
                    {comment.userId === 1
                      ? "JacksonW21"
                      : null || comment.userId === 2
                      ? "MarcusG44"
                      : null || comment.userId === 3
                      ? "DemoUser"
                      : null}{" "}
                    stated:
                  </div>

                  {comment.comment}
                  <p
                    style={{
                      borderBottom: "1px solid black",
                      marginBottom: "10px",
                      marginTop: "10px",
                    }}
                  ></p>

                  <button
                    className={styles.btn}
                    onClick={(e) => setVisible(true)}
                    value={comment.id}

                    style={{
                      textDecoration: "none",
                      visibility:
                        user.id === comment.userId ? "visible" : "hidden",
                    }}
                  >
                    Edit
                  </button>

                  <button
                    className={styles.btn}
                    materialId={material.id}
                    value={comment.id}
                    onClick={(e) =>
                      handleDeleteComment(
                        e.target.value,
                        materialId
                      )
                    }
                    style={{
                      visibility:
                        user.id === comment.userId ? "visible" : "hidden",
                    }}
                  >
                    delete
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
export default SingleMaterial;
//
