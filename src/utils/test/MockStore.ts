export default function getMockedStore () {
  const mockDispatch = jest.fn(() => Promise.resolve(true))
  const mockCommit = jest.fn(() => Promise.resolve(true))
  return {
    useStore: () => ({
      dispatch: mockDispatch,
      commit: mockCommit,
      state: {}
    }),
    mockDispatch,
    mockCommit
  }
}