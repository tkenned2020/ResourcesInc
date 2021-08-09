import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useHistory, NavLink } from "react-router-dom";
import { singleMaterial, deleteMaterial } from "../../../store/material";
import { getComments, createComment, editComment, deleteComment } from "../../../store/comment";
import CommentEdit from '../../CommentFolder/EditComment';
import styles from './SingleMaterial.module.css'

function SingleMaterial() {
  const history = useHistory();
  const dispatch = useDispatch();
  const { materialId } = useParams()
  const [comment, setComment] = useState('');
  const material = useSelector((state) => state.material.current);
  const user = useSelector(state => state.session.user)
  const comments = useSelector(state => state.comments)

  useEffect(() => {
    if(materialId) dispatch(singleMaterial(materialId));
  }, [dispatch, materialId]);

  const payload = {
    userId : user.id,
    comments : comment,
    material_documentationId : materialId
  }
console.log('why is history undefined==>', history)

  const handleCreateComment = e => {
    e.preventDefault();
    dispatch(createComment(payload, history))
    window.location.reload()
  }




  const handleDeleteComment = (commentId, materialId) => {
    dispatch(deleteComment(materialId, commentId , history))
  }

  const handleDeleteMaterial = (e) => {
    e.preventDefault();
    console.log( "inside of handleDeleteMaterial what is materialId", materialId);

    dispatch(deleteMaterial(materialId, history));
  };

  return (
    <div className={styles.singleMaterialContainer}>
      {material && (
        <div key={material.id} className={styles.infoContainer}>
          <br />
          <div className={styles.info}
            key={material.id}
          >
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
              <h4 className={styles.infoSynopsis}>{material.synopsis}</h4>
            </div>
            <div className={styles.infoContentContainer}>
              <p>{material.content}</p>
            </div>
            <div>
            <div className={styles.infoCitation}>{material.citation === null ? "Citations belong here" : `Citatations: ${material.citation}`}</div>
            </div>
            <div className={styles.infoAuthor}>
              <p>Constructed By: </p>
              <strong>
                 {material.userId === 1 ? " JacksonW21" : null
                 || material.userId === 2 ? " MarcusG44" : null
                 || material.userId === 3 ? " DemoUser" : null
                 || material.userId === 4 ? " TestUser" : null
              }
              {//user.username
              }
              </strong>
            </div>
            <NavLink className={styles.infobtn} style={{textDecoration: "none"}} to={`/materials/${material.id}/edit`}>Edit</NavLink>
              <button className={styles.infobtn} type="button" onClick={handleDeleteMaterial}>
                Delete
              </button>
            <br />
            <div className={styles.commentContainer}>
              <form onSubmit={handleCreateComment} >
              <label>Comment</label>
              <textarea
              name="comment"
              id="comment"
              placeholder="Enter your comment"
              value={comment}
              onChange={e => setComment(e.target.value)}
              required rows="10" cols="5"/>
              <button className={styles.btn} type="submit">Comment</button>
              </form>
            </div>
            {//<button type="button">Comment</button>
            }
            <br />
          </div>
          <div className={styles.infoCommentedSection}>
            {material.comments.map(comment => <div styles={{backgroundColor: "red"}} key={comment.id}>
            <div className={styles.commentUserName}>
              {comment.userId === 1 ? "JacksonW21" : null ||
              comment.userId === 2 ? "MarcusG44" : null ||
              comment.userId === 3 ? "DemoUser" : null

              } stated:
            </div>

            {comment.comment}
              <p style={{borderBottom: "1px solid black", marginBottom: "10px", marginTop: "10px" }}></p>
            <NavLink className={styles.btn} to="/comment/edit" value={comment.id} style={{ textDecoration: "none", visibility: user.id === comment.userId ? "visible" : "hidden"}} >Edit</NavLink>
            <button className={styles.btn} onClick={e => handleDeleteComment((e.target.value), materialId)}  materialId={material.id} value={comment.id} style={{ visibility: user.id === comment.userId ? "visible" : "hidden"}}>delete</button>
            </div>)}
          </div>
        </div>
      )}
  </div>
  );
}
export default SingleMaterial;
//
