export default (state, { payload }) => {
  if (state.createdBy !== payload.user) {
    throw new Error('Permission denied')
  }
}
