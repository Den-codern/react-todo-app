import React, { Component } from "react";

import AppHeader from "../app-header";
import SearchPanel from "../search-panel";
import TodoList from "../todo-list";
import ItemStatusFilter from "../item-status-filter";
import AddTask from "../add-task";

import "./app.css";

export default class App extends Component {
  maxId = 100;

  state = {
    todoData: [
      this.createTodoItem("Drink Coffee"),
      this.createTodoItem("Make Awesome App"),
      this.createTodoItem("Have a lunch")
    ],
    search:'',
    filter:'all'
  };

  createTodoItem(label) {
    return { label: label, important: false, done:false, id: this.maxId++ };
  }

  searchLabel = (items,term) => {
    if(term.lenght === 0) {
      return items
    }
    return items.filter((e) => {
      return e.label.toLowerCase().indexOf(term.toLowerCase()) > -1;

    })
  }

  onSearchLabel = (search) => {
   this.setState({
      search
   })
  }
  onFilterItems = (filter) => {
    console.log(filter);
      this.setState({
        filter
      }) 
  }

  filterItems = (items,filter) => {
      if(filter === 'all') {
        return items
      }
      else if(filter === 'active') {
        return items.filter((e) => {
          return !e.done
        })
      }else if (filter === 'done') {
         return items.filter((e) => {
           return e.done
         })
      }
    
  }

  addItem = (text) => {
    const newItem = this.createTodoItem(text)

    this.setState(({ todoData }) => {
      const newArr = [...todoData, newItem];

      return {
        todoData: newArr,
      };
    });
  };

  deleteItem = (id) => {
    this.setState(({ todoData }) => {
      const idx = todoData.findIndex((el) => el.id === id);

      const newArray = [...todoData.slice(0, idx), ...todoData.slice(idx + 1)];

      return {
        todoData: newArray,
      };
    });
  };

  onToggleImportant = (id) => {
    this.setState(({todoData}) => {
      return {
        todoData:this.toggleProperty(todoData,id,'important')
      }
    })
  };

  toggleProperty(arr,id,propName) {
    const idx = arr.findIndex((e) => e.id === id)
    const oldItem = arr[idx]
    const newItem = {...oldItem,[propName]:!oldItem[propName]}
    return [...arr.slice(0,idx),newItem,...arr.slice(idx+1)]
    }
  


  onToggleDone = (id) => {
    this.setState(({todoData}) => {
      return {
        todoData:this.toggleProperty(todoData,id,'done')
      }
    })
  };

  render() {
    const toDoCount = this.state.todoData.filter(e => e.done).length
    const doneCount = this.state.todoData.length - toDoCount
    const vidibleItem = this.searchLabel(this.filterItems(this.state.todoData,this.state.filter),this.state.search)
    const filter = this.state.filter
    return (
      <div className="todo-app">
        <AppHeader toDo={toDoCount} done={doneCount} />
        <div className="top-panel d-flex">
          <SearchPanel onSearchLabel={this.onSearchLabel}/>
          <ItemStatusFilter filter={filter} onFilterItems={this.onFilterItems}/>
        </div>

        <TodoList
          todos={vidibleItem}
          onDeleted={this.deleteItem}
          onToggleImportant={this.onToggleImportant}
          onToggleDone={this.onToggleDone}
        />

        <AddTask onItemAdded={this.addItem} />
      </div>
    );
  }
}


