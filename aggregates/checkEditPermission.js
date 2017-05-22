export default (state, {payload}) => {
  if (state.createdBy !== payload.userId) {
    throw new Error('Permission denied')
  }
}
