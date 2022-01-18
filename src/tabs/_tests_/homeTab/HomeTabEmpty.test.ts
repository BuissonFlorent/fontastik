
import HomeTab from '@/tabs/HomeTab.vue'
import { mount } from '@vue/test-utils'

const mockDispatch = jest.fn(() => Promise.resolve(true))
const mockCommit = jest.fn(() => Promise.resolve(true))
jest.mock('vuex', () => ({
  useStore: () => ({
    dispatch: mockDispatch,
    commit: mockCommit,
    state: {}
  })
}))

localStorage.clear()
describe('HomeTab.vue with localStorage empty', () => {
  
  const wrapper = mount(HomeTab as any)
  test('mounts', () => {
    expect(wrapper.exists()).toBe(true)
  })
  test('get cards on first time', () => {
    expect(mockDispatch).toHaveBeenCalledWith('getCardsFromDB')
    expect(mockDispatch).toHaveBeenCalledWith('setLocalCards')
    expect(mockDispatch).toHaveBeenCalledWith('initializeDeck')
    expect(mockCommit).not.toHaveBeenCalledWith('getLocalCards')
  })
  test('doesn\'t get local user from localStorage if empty', () => {
    expect(mockCommit).not.toHaveBeenCalledWith('getLocalUser')
  })
})

