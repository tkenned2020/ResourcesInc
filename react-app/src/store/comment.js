/* create and define action types as const */

const ADD_COMMENT = 'comment/ADD_COMMENT'
const SET_COMMENTS = 'comment/SET_COMMENTS'
const EDIT_COMMENT = 'comment/EDIT_COMMENT'
const DELETE_COMMENT = 'comment/DELETE_COMMENT'


/* create and define action creators */

const addCommentToStore = (comment) => ({
  type: ADD_COMMENT, //action type = action.type
  comment //payload = action.payload
})

const setCommentsToStore = (comments) => ({
  type: SET_COMMENTS, //action type = action.type
  comments //payload = action.
})

const editCommentInStore = (comment) => ({
  type: EDIT_COMMENT, //action type = action.type
  comment //payload = action.payload
})

const deleteCommentFromStore = (commentId) => ({
  type: DELETE_COMMENT, //action type = action.type
  commentId //payload = action.payload
})


export const getComments = () => async dispatch => {
  const response = await fetch(`/api/comments`)

  if(response.ok){
    const data = await response.json();
    const allComments = data.comments
    dispatch(setCommentsToStore(allComments))
    return allComments
  } else {
    const data = await response.json()
    return data.errors
  }
}


export const createComment = (comment) => async dispatch => {
  const response = await fetch(`/api/materials/${comment.material_documentationId}/comments/create`, {
    method: 'POST',
    body: JSON.stringify(comment),
    headers: {"Content-Type" : "application/json"},

  })

  if (response.ok){
  const createdComment = await response.json()
  dispatch(addCommentToStore(createdComment))
  return createdComment
  } else {
  const data = await response.json()
  return data.errors
  }

}


export const editComment = ( comment, history ) => async dispatch => {
  const response = await fetch(`/api/materials/:materialId/comments/${comment.id}/edit`, {
    method: 'PATCH',
    body: JSON.stringify(comment),
    headers: { "Content-Type": "application/json"},
  })

  if(response.ok){
    const editedComment = response.json();
    dispatch(addCommentToStore(editedComment))
    return editedComment
  } else {
    const data = await response.json()
    return data.errors
  }
}


export const deleteComment = (commentId, history) => async dispatch => {
  console.log('this is the comment to deletes id',commentId)
  const response = await fetch(`/api/materials/:materialId/comments/${commentId}`, {
    method : "DELETE",

  })

  if(response.ok){
    const data = await response.json();
    const updatedCommentList = data.comments
    console.log('what is data.comments ===>',updatedCommentList)
    dispatch(setCommentsToStore(updatedCommentList))
  }

}


const initialState = {
  current: null,
  all: {}
}


export default function reducer (state = initialState, action){

  let newState;
  switch (action.type){
    case ADD_COMMENT:
      return { ...state, current : action.comment };
    case SET_COMMENTS:
      newState = {...state}
      for(let key in action.comments){
        let comment = action.comments[key]
        newState.all[key] = comment
      }
      return newState;
    default:
      return state;
  }
}
