import React, { useState, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, NavLink, useParams } from 'react-router-dom';
import { createComment, editComment, deleteComment } from '../../store/comment'


export default function CommentEdit (){
  const history = useHistory();
  const dispatch = useDispatch();
  const { materialId } = useParams()
  const [comment, setComment] = useState('');
  const [errors, SetErrors] = useState([]);
  const material = useSelector((state) => state.material.current);
  const user = useSelector(state => state.session.user)


  useEffect(()=>{
    if(material){
      setComment(material.comments.filter(comment => comment.id === Number(commentId))[0]?.comment)
    }
  },[])

  const handleEditComment = (commentId) => {
    console.log('<------------->',materialId, commentId)
    dispatch(editComment({
      commentId : commentId,
      materialId : material.id,
      userId : user.id,
      comment : material.comments.filter(comment => comment.id === Number(commentId))[0]?.comment,
    }, history))
    setComment("")
  }


  return (
    <div>
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
