
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
localStorage.setItem('user', 'anything')
localStorage.setItem('cards', 'anything')

describe('HomeTab.vue with localStorage not empty', () => {
  const wrapper = mount(HomeTab as any)
  test('mounts', () => {
    expect(wrapper.exists()).toBe(true)
  })
  test('gets cards from localStorage', () => {
    expect(mockCommit).toHaveBeenCalledWith('getLocalCards')
    expect(mockDispatch).not.toHaveBeenCalledWith('getCardsFromDB')
  })
  test('gets user from localStorage', () => {
    expect(mockCommit).toHaveBeenCalledWith('getLocalUser')
  })
  test('shows title', () => {
    expect(wrapper.text()).toContain('Page d\'accueil')
  })
})