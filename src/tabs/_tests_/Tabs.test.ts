import { mount } from '@vue/test-utils';
import App from '../App.vue';

describe('Mounted App', () => {
    const wrapper = mount(App);
  
    test('does a wrapper exist', () => {
      expect(wrapper.exists()).toBe(true)
    })
})



import HomeScreen from '@/tabs/HomeScreen.vue'

describe('HomeScreen.vue', () => {
    it('renders home screen view', () => {
        const wrapper = mount(HomeScreen)
        expect(wrapper.text()).toMatch('Home Screen')
    })
})

/*test('sanity test', () => {
    return
})*/

/*import HomeTab from '../HomeTab.vue';
import ReviewTab from '../ReviewTab.vue';

describe('Home tab', () => {

    it('should render correctly', () => {
        

        getByText(`Page d'accueil`);
    })
})

describe('Review tab', () => {

    it('should render correctly', () => {
        

        getByText(`Apprentissage`);
    })
})*/

/*import Vue from 'vue';
import App from '../App.vue';

function mountComponentWithProps (Component, propsData) {
  const Constructor = Vue.extend(Component);
  const vm = new Constructor({
    propsData
  }).$mount();

  return vm.$el;
}

describe('App', () => {
  it('should have the correct title', () => {
    const headingData = mountComponentWithProps(App, { title: 'Hello, Vue!' });
    const titleData = headingData.textContent;

    expect(titleData).toEqual('Hello, Vue!');
  });
});*/


