/* create and define action types as const */

const ADD_COMMENT = 'comment/ADD_COMMENT'
const EDIT_COMMENT = 'comment/EDIT_COMMENT'
const DELETE_COMMENT = 'comment/DELETE_COMMENT'


/* create and define action creators */

const addCommentToStore = (comment) => ({
  type: ADD_COMMENT, //action type = action.type
  comment //payload = action.payload
})

const editCommentInStore = (commentId) => ({
  type: EDIT_COMMENT, //action type = action.type
  commentId //payload = action.payload
})

const deleteCommentFromStore = (commentId) => ({
  type: DELETE_COMMENT, //action type = action.type
  commentId //payload = action.payload
})


export const createComment = ( comment ) => async dispatch => {
  const response = await fetch(`/api/materials/:materialId/comments`, {

  })

}

export const editComment = ( commentId ) => async dispatch => {

}

export const deleteComment = (commentId) => async dispatch => {
  console.log(commentId)
}
