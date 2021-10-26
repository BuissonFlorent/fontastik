import { render } from '@testing-library/vue';
import Tabs from '../Tabs.vue';

describe('Tabs', () => {

    it('should render correctly', () => {
      const { container } = render(Tabs, {
      })
  
      expect(container.textContent).toContain('Home Screen')
    })
  })
