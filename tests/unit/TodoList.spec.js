import { shallowMount } from '@vue/test-utils'
import TodoList from '@/components/TodoList.vue'
import VueMaterial from 'vue-material'
import Vue from 'vue';



describe('TodoList.vue', () => {
  let wrapper
  beforeEach(() => {
    Vue.use(VueMaterial);
    //wrapper = shallowMount(TodoList)
    wrapper = shallowMount(TodoList, {
      data() {
        return {
          todos: [{
            isActive: true,
            message: "modanisa"
          }],
          newTodo: ""
        };
      }
    });
  })



  it('renders a vue instance', () => {
    expect(shallowMount(TodoList).isVueInstance()).toBe(true);
  });

  it('has an h1', () => {
    expect(wrapper.contains('h1')).toBe(true)
  })

  it('Find input- type text ', () => {
    expect(wrapper.contains('[id="todoInput"]')).toBe(true)
  })

  it('Must be add button', () => {
    expect( wrapper.contains('[id="addButton"]')).toBe(true)
  })
})