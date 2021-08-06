import React, { useState, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, NavLink, useParams } from 'react-router-dom';
import { createComment, deleteComment } from '../../store/comment'


export default function CommentCreation (){
  const history = useHistory();
  const dispatch = useDispatch();
  const { materialId } = useParams()
  const [comment, setComment] = useState('');
  const user = useSelector(state => state.session.user)

  const payload = {
    userId : user.id,
    comment : comment,
    material_documentationId : materialId
  }

  const handleCreateComment = e => {
    e.preventDefault();
    console.log('this is history comment', history)
    dispatch(createComment({userId: user.id, material_documentationId : materialId, comment}, history))
  }

  // useEffect( () => {
  //   dispatch(createComment(payload))
  // })

  console.log('with this tell me the user ==>',user.id)

  return (
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
        <button type="button">submit</button>
      </form>


    </div>
  )

}
