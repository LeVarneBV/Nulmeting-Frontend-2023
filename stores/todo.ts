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
  state: () => ({ listOfActions: [] as TodoItem[] }),
  
  actions: {
    async callAPI() {
      let promiseTodoItem: Promise<TodoItem> = axios.request(config)
        .then((response: any) => {
          let tempObj: any = JSON.parse(JSON.stringify(response.data)).todo;
          return new TodoItem(tempObj.id, tempObj.assignee, tempObj.dueDateTime, tempObj.description)
        })
        .catch((error: any) => {
          console.log(error);
          return new TodoItem("", "", new Date(), "");
        });

      const itemId: string = (await promiseTodoItem).id
      if (itemId === "")
        return;

      if (this.listOfActions.find(x => x.id === itemId) == undefined)
        this.listOfActions.push(await promiseTodoItem);
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