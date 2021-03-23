import TaskOne from "./pages/taskOne";
import TaskTwo from "./pages/taskTwo";
import TaskThree from "./pages/taskThree";

const routes = [
  {
    id: 1,
    name: "task-one",
    path: "/task-one",
    component: TaskOne,
  },
  {
    id: 2,
    name: "task-two",
    path: "/task-two",
    component: TaskTwo,
  },
  {
    id: 3,
    name: "task-three",
    path: "/task-three",
    component: TaskThree,
  },
];

export { routes };
