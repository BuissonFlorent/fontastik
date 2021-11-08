import { render } from '@testing-library/vue';
import AppTabs from '../AppTabs.vue';

describe('Tabs', () => {

    it('should render correctly', () => {
      const { container } = render(AppTabs, {
      })
  
      expect(container.textContent).toContain('Home Screen')
    })
  })
