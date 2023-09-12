import { _AsyncData } from 'nuxt/dist/app/composables/asyncData';

let config = {
  method: 'get',
  maxBodyLength: Infinity,
  url: 'https://86a4h9y007.execute-api.eu-west-1.amazonaws.com/development/nulmeting/todo',
  headers: {
    'x-api-key': '' // You have to put in the x-api-key yourself
  }
};

// The TodoStore itself
export const useTodoStore = defineStore("todoStore", {
  state: () => ({ listOfTodos: [] as TodoItem[] }),

  actions: {
    async callAPI() {
      const todoItemData: _AsyncData<string, Error | null> = await useFetch(config.url,
        {
          method: "GET",
          headers: config.headers
        })

      if (todoItemData.error.value != null)
      {
        console.log(`Er ging iets fout in de useFetch:\n${todoItemData.error.value}`);
      }
      const retrievedObject: any = JSON.parse(JSON.stringify(todoItemData.data.value)).todo;
      //The id of the item is getting used several times

      // Add the TodoItem to the list if it doesn't exist yet
      if (this.listOfTodos.find(x => x.id === retrievedObject.id) == undefined)
        this.listOfTodos.push(apiObjectConvert(retrievedObject));
    },
  },
})

export interface TodoItem {
  id: string;
  assignee: string;
  dueDateTime: Date;
  description: string;
}

function apiObjectConvert(apiObject: any): TodoItem{
  return {
    id: apiObject.id,
    assignee: apiObject.assignee,
    dueDateTime: new Date(apiObject.dueDateTime),
    description: apiObject.description
  }
}