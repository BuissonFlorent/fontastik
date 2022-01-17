const spyDispatch = jest.fn();

export const useStore = () => ({
  dispatch: spyDispatch,
})