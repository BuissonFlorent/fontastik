import { mount } from '@vue/test-utils'
import UserProfile from '@/components/UserProfile.vue'
jest.mock('@/components/AdminPanel.vue', () => ({}))

describe('UserProfile.vue', () => {
  localStorage.setItem('user', '{"userID": "anything", "userName": "john doe"}')
  const wrapper = mount(UserProfile as any)
  it('mounts', () => {
    expect(wrapper.exists()).toBe(true)
  })
  it('greets current user', () => {
    expect(wrapper.text()).toContain('Bonjour john doe')
  })
})