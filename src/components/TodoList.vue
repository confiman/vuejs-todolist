<template>
  <div class="hello" style="display: flex; flex-direction: column; justify-content: center; align-items: center">
    <h1>{{ msg }}</h1>
    <div style="display: flex; flex-direction: row; justify-content: center; align-items: center">
      <div style="width: 400px">
    <md-field>
      <label>TODO</label>
      <md-input id="todoInput" v-model="newTodo"></md-input>
    </md-field>
    </div>
    <div>
    <md-button id="addButton" class="md-raised md-primary" @click="addTodo()"
      >ADD</md-button
    >
    </div>
    </div>
    <div style="width:500px">
    <md-list>
      <md-list-item v-for="todo in todos" :key="todo.id">
        <span
          class="md-list-item-text cursor"
          v-bind:class="{ active: !todo.isActive }"
          v-on:click="updateTodo(todo)"
          :title="todo.message"
          >{{ todo.message }}</span
        >
        <md-button class="md-icon-button md-raised" @click="removeTodo(todo)">
        <md-icon>delete</md-icon>
      </md-button>
      </md-list-item>
    </md-list>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: "TodoList",
  props: {
    msg: String,
    list: Array,
  },
  data: function () {
    return {
      todos: [],
      newTodo: ""
    };
  },
  mounted() {
    axios.get('https://modanisa-devops-challenge.westeurope.cloudapp.azure.com/todos').then(response => {this.todos=response.data
    console.log(this.todos)})
  },
  methods: {
    addTodo: function () {
      if(this.newTodo.length > 0) {
        axios.post('https://modanisa-devops-challenge.westeurope.cloudapp.azure.com/todos/',  {message: this.newTodo, isActive:true}).then(() => axios.get('https://modanisa-devops-challenge.westeurope.cloudapp.azure.com/todos').then(response => this.todos=response.data))
        this.newTodo=""
      }
    },
    removeTodo: function (todo) {
      axios.get('https://modanisa-devops-challenge.westeurope.cloudapp.azure.com/todos').then(response => response.data.forEach(element => {
        if(element.id == todo.id) {
          axios.delete('https://modanisa-devops-challenge.westeurope.cloudapp.azure.com/todos/' + element.id)
        }
      }))
      this.todos.splice(this.todos.indexOf(todo), 1)
    },
    updateTodo: function (todo) {
      todo.isActive = !todo.isActive
      axios.get('https://modanisa-devops-challenge.westeurope.cloudapp.azure.com/todos').then(response => response.data.forEach(element => {
        if(element.id == todo.id) {
          axios.put('https://modanisa-devops-challenge.westeurope.cloudapp.azure.com/todos/' + element.id, {message: todo.message, isActive:todo.isActive})
        }
      }))
    }
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.active {
  text-decoration: line-through;
}
.cursor {
  cursor: pointer;
}
</style>
