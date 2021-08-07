import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useHistory, NavLink } from "react-router-dom";
import { singleMaterial, deleteMaterial } from "../store/material";
import { getComments, createComment, editComment, deleteComment } from "../store/comment";
import CommentEdit from './CommentFolder/EditComment';

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
    material && (
      <div styles={{ margin: "12px 13px 14px 15px" }}>
        <br />
        <div
          style={{ border: "solid", marginBottom: "12px" }}
          key={material.id}
        >
          <h2>{material.title}</h2>
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
          <div>{material.citation === null ? "Citations belong here" : material.citation}</div>
          </div>
          <div>
            constructed by:
            <strong>
               {material.userId === 1 ? "JacksonW21" : null
               || material.userId === 2 ? "MarcusG44" : null
               || material.userId === 3 ? "DemoUser" : null
            }
            {//user.username
            }
            </strong>
          </div>
          <br />
          <div>
          <form onSubmit={handleCreateComment} >
          <label>Comment</label>
          <textarea
          name="comment"
          id="comment"
          placeholder="Enter your comment"
          value={comment}
          onChange={e => setComment(e.target.value)}
          required rows="10" cols="5"/>
          <button type="submit">Comment</button>
        </form>
          {//<button type="button">Comment</button>
          }
            <NavLink to={`/materials/${material.id}/edit`}>Edit</NavLink>
            <button type="button" onClick={handleDeleteMaterial}>
              Delete
            </button>
          </div>
          <br />
        </div>
        <div>
        {material.comments.map(comment => <div styles={{backgroundColor: "red"}} key={comment.id}>
        <div>edit button will go here</div>
        {comment.userId === 1 ? "JacksonW21" : null ||
        comment.userId === 2 ? "MarcusG44" : null || comment.userId === 3 ? "DemoUser" : null} stated:
        <br/>
        {comment.comment}

        <NavLink to="/comment/edit" value={comment.id} style={{backgroundColor: "lightblue", visibility: user.id === comment.userId ? "visible" : "hidden"}} >Edit</NavLink>
        <button onClick={e => handleDeleteComment(e.target.value, materialId)}  materialId={material.id}value={comment.id} style={{backgroundColor: "red", visibility: user.id === comment.userId ? "visible" : "hidden"}}>delete</button>
        </div>)}
        </div>
      </div>
    )
  );
}
export default SingleMaterial;
//
