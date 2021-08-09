import React, { useState, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, NavLink, useParams, Redirect } from 'react-router-dom';
import { getComments, createComment, editComment, deleteComment } from '../../store/comment'
import styles from './EditComment.module.css'

export default function CommentEdit (){
  const history = useHistory();
  const dispatch = useDispatch();
  const { materialId } = useParams()
  const [comment, setComment] = useState('');
  const [errors, SetErrors] = useState([]);
  const material = useSelector((state) => state.material.current);
  const user = useSelector(state => state.session.user)

  console.log("what is the material", material)
  // console.log("what is the id of the comment", material.comments[0].id)

  // useEffect( ()=> dispatch(getComments()))

  const currentComment = material?.comments.filter(comment => comment.userId === user?.id)[0]
  const commentId = currentComment?.id

  useEffect(()=>{
    if(material){
      setComment(material.comments.filter(comment => comment.id === Number(commentId))[0]?.comment)
    }
  },[])

  const handleEditComment = (commentId) => {
    const currentComment = material.comments.filter(comment => comment.userId === user.id)[0]
    commentId = currentComment.id
     dispatch(editComment({
      commentId : commentId,
      materialId : material.id,
      userId : user.id,
      comment : material.comments?.filter(comment => comment.id === Number(commentId))[0]?.comment,
    }, history))
    if (comment){
      console.log("what is material", comment)
    }

    // setComment("")
    // if(material){history.push(`/materials/${material.id}`)}
    // history.push(`/materials`)
  }


  return (
    <div className={styles.commentContainer}>
      <form onSubmit={handleEditComment} >
        <label>Comment</label>
        <textarea
        name="comment"
        id="comment"
        placeholder="Enter your comment"
        value={comment}
        onChange={e => setComment(e.target.value)}
        required rows="10" cols="5"/>
        <button onClick={e => handleEditComment(e.target.value)}  value={comment.id} >Submit</button>
      </form>
    </div>
  )

}
