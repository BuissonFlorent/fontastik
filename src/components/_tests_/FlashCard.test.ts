import { mount } from '@vue/test-utils'
import FlashCard from '@/components/FlashCard.vue'

const mockDispatch = jest.fn(() => Promise.resolve(true))
const mockCommit = jest.fn(() => Promise.resolve(true))
jest.mock('vuex', () => ({
  useStore: () => ({
    dispatch: mockDispatch,
    commit: mockCommit,
    state: {
      user: {
        userID: 'anything'
      },
      deck: [
        {
          fonWriting: 'fon translation',
          frenchWriting: 'french translation',
        }
      ]
    }
  })
}))

describe('FlashCard.vue', () => {
  const wrapper = mount(FlashCard as any)
  it('mounts', () => {
    expect(wrapper.exists()).toBe(true)
  })
  test('shows a button to display the translation', () => {
    const button = wrapper.find('[data-testid="display-translation"]')
    expect(button.exists()).toBe(true)
    expect(button.text()).toContain('Montrer la traduction')
  })
  test('shows translation after clicking button', async () => {
    const button = wrapper.find('[data-testid="display-translation"]')
    expect(wrapper.text()).not.toContain('french translation')
    await button.trigger('click')
    expect(wrapper.text()).toContain('french translation')
  })
  test('marks translation as known', async () => {
    const button = wrapper.find('[data-testid="mark-as-known"]')
    await button.trigger('click')
    expect(mockCommit).toHaveBeenCalledWith('setCardNextReview', true)
  })
  test('marks translation as not known', async () => {
    await wrapper.find('[data-testid="display-translation"]').trigger('click')
    await wrapper.find('[data-testid="mark-as-not-known"]').trigger('click')
    expect(mockCommit).toHaveBeenCalledWith('setCardNextReview', false)
  })
})