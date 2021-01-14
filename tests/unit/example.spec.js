import { shallowMount} from '@vue/test-utils'
import TodoList from '@/components/TodoList.vue'
import VueMaterial from 'vue-material'
import axios from 'axios';


let wrapper = null;

beforeEach(() => {
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
});

afterEach(() => {
  wrapper.destroy();
});





describe('Render Tests', () => {
  

  it('Must be text area', () => {
    const todoInput = wrapper.find('md-input[id="todoInput"]');
    expect(todoInput.exists()).toBe(true);
  })

  it('Must be add button', () => {
    const addButton = wrapper.find('md-button[id="addButton"]');
    expect(addButton.exists()).toBe(true);
  })
})
