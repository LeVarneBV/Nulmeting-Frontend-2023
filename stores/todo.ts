import axios from 'axios';

let config = {
  method: 'get',
  maxBodyLength: Infinity,
  url: 'https://86a4h9y007.execute-api.eu-west-1.amazonaws.com/development/nulmeting/todo',
  headers: { 
    'x-api-key': '6AgP2Gr7j3QvJHIr7xOq4OlY5McyScy3kqQL5Mr7'
  }
};
export const useTodoStore = defineStore("todoStore", {
  state: () => ({ listOfActions: [] as TodoItem[] }),
  
  actions: {
    async callAPI() {
      let todoItem: Promise<TodoItem> = axios.request(config)
        .then((response: any) => {
          console.log(JSON.stringify(response.data));
          return JSON.parse(JSON.stringify(response.data));
        })
        .catch((error: any) => {
          console.log(error);
          return null;
        });
      
      if (await todoItem === null)
        return;

      this.listOfActions.push(await todoItem);
    },
  },
})

class TodoItem {
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