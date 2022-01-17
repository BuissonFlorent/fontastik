import { mount } from '@vue/test-utils'
import ExploreContainer from '@/components/ExploreContainer.vue'

describe('ExploreContainer.vue', () => {
  const wrapper = mount(ExploreContainer as any, {
    props: {
      name: 'test name'
    }
  })
  it('mounts', () => {
    expect(wrapper.exists()).toBe(true)
  })
  it('shows passed name', () => {
    expect(wrapper.text()).toContain('test name')
  })
  it('shows explore link', () => {
    expect(wrapper.text()).toContain('Explore UI Components')
  })
})