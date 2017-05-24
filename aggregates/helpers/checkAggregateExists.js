export default state => {
  if (!state.created) {
    throw new Error('Aggregate not found')
  }
}
