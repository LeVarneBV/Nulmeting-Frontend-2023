// Axios part, needed for calling API
import axios from 'axios';

let config = {
  method: 'get',
  maxBodyLength: Infinity,
  url: 'https://86a4h9y007.execute-api.eu-west-1.amazonaws.com/development/nulmeting/todo',
  headers: { 
    'x-api-key': '6AgP2Gr7j3QvJHIr7xOq4OlY5McyScy3kqQL5Mr7'
  }
};

// The TodoStore itself
export const useTodoStore = defineStore("todoStore", {
  state: () => ({ listOfTodos: [] as TodoItem[] }),
  
  actions: {
    async callAPI() {
      const promiseTodoItem: Promise<TodoItem> = axios.request(config)
        .then((response: any) => {
          return JSON.parse(JSON.stringify(response.data)).todo
        })
        .catch((error: any) => {
          console.log(error);
          return new TodoItem("", "", new Date(), "");
        });
      
      // The id of the item is getting used several times
      const itemId: string = (await promiseTodoItem).id
      // Exit the action, this is the case when an error has occured
      if (itemId === "")
        return;

      // Add the TodoItem to the list if it doesn't exist yet
      if (this.listOfTodos.find(x => x.id === itemId) == undefined)
        this.listOfTodos.push(await promiseTodoItem);
    },
  },
})

export class TodoItem {
  id: string;
  assignee: string;
  dueDateTime: Date;
  description: string;

  constructor (id: string, assignee: string, dueDateTime: Date, description: string) {
    this.id = id;
    this.assignee = assignee;
    this.dueDateTime = dueDateTime;
    this.description = description;
  }
}