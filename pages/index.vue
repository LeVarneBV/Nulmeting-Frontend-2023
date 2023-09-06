<template>
  <div class="page-wrapper">
    <div class="element-wrapper">
      <div class="element-body">
        <h1>Welkom bij de Levarne Nulmeting</h1>
        <LevButton @clicked="todoStore.callAPI">Haal opdracht op!</LevButton>
        <br>
        <ul id="todo-table">
          <li v-for="todo in todos" class="table-item">
            {{ todo.assignee }} - {{ getNormalTimeFormat(todo.dueDateTime)}} - {{ todo.description }}
          </li>
        </ul>
        <br>
        <label>Kies een sorteer optie: </label>
        <select ref="sortselect">
          <option value="Name">Naam</option>
          <option value="Date">Datum</option>
          <option value="Description">Beschrijving</option>
        </select>
        <br>
        <NuxtLink to="/about">Over ons</NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { TodoItem } from 'stores/todo'
const todoStore = useTodoStore();

const todos = computed(() => {
  return todoStore.listOfTodos.sort((a, b) => sortMethod(a, b, "Date"));
});

// I want to use this part for sorting the list, but I can't fix the problem 
// with being allowed of using 'sortType'... (or sortselect.value)
const sortselect = ref(null);
onMounted(() => {
  const sortType: string | null = sortselect.value
})
</script>
<script lang="ts">
// I know that this function isn't entirely functionably
function sortMethod(element1: TodoItem, element2: TodoItem, sortingType: string): number {
  if (sortingType === "Name")
      return spaceshipOperator(element1.assignee, element2.assignee);
  if (sortingType === "Date")
      return spaceshipOperator(element1.dueDateTime, element2.dueDateTime);
  if (sortingType === "Description")
      return spaceshipOperator(element1.description, element2.description);
  return 0;
}

// Name says what is it does, 0 is not relevent
function spaceshipOperator(element1: any, element2: any): number {
  let tempList: any[] = [element1, element2].sort()
  if (element1 == tempList[0])
    return -1;
  return 1;
}

// I took a lot of time to use a function. But I couldn't get it working
function getNormalTimeFormat(dateTime: Date): string {
  let timeString = dateTime.toString();
  const year: string = timeString.substring(0, 4);
  const month: string = timeString.substring(5, 7);
  const day: string = timeString.substring(8, 10);
  const hours: string = timeString.substring(11, 13);
  const minutes: string = timeString.substring(14, 16);
  return `${day}/${month}/${year}, ${hours}:${minutes}`;
}
</script>