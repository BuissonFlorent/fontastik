import { shallowMount } from '@vue/test-utils'
import AppTabs from '../AppTabs.vue'

describe('AppTabs', () => {
    const wrapper = shallowMount(AppTabs as any)
    test('mounts', () => {
      expect(wrapper.exists()).toBe(true)
    })
})
