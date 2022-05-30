import { arrTheme } from "../../themes/ThemesManager";
import { ToDoListDarkTheme } from "../../themes/ToDoListDarkTheme";
import {
  CHANGE_THEME,
  CHECK_TASK,
  DELETE_TASK,
  EDIT_TASK,
  SET_TASK,
  UPDATE_TASK,
} from "../constants/todo.constants";

let initialState = {
  theme: ToDoListDarkTheme,
  taskList: [
    { id: 1, name: "Task 1", done: true },
    { id: 2, name: "Task 2", done: true },
    { id: 3, name: "Task 3", done: false },
    { id: 4, name: "Task 4", done: false },
  ],
  taskEdit: { id: "", name: "", done: false },
};

export const ToDoReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case CHANGE_THEME: {
      let theme = arrTheme.find((item) => item.id == payload).theme;
      return { ...state, theme };
    }

    case DELETE_TASK: {
      return {
        ...state,
        taskList: state.taskList.filter((item) => item.id != payload),
      };
    }

    case CHECK_TASK: {
      let taskListUpdate = [...state.taskList];
      let index = taskListUpdate.findIndex((item) => item.id === payload);
      if (index !== -1) {
        taskListUpdate[index].done = true;
      }
      return { ...state, taskList: taskListUpdate };
    }

    case SET_TASK: {
      let taskListUpdate = [...state.taskList];

      if (payload.name.trim() === "") {
        return { ...state };
      }

      let index = taskListUpdate.findIndex(
        (item) => item.name === payload.name
      );

      if (index !== -1) {
        return { ...state };
      }

      return { ...state, taskList: [...taskListUpdate, payload] };
    }

    case EDIT_TASK: {
      return { ...state, taskEdit: payload };
    }

    case UPDATE_TASK: {
      if (payload.trim() === "") {
        return { ...state };
      }

      let taskEditNew = { ...state.taskEdit, name: payload };

      let taskListUpdate = [...state.taskList];

      let index = taskListUpdate.findIndex((item) => item.id == taskEditNew.id);

      if (index !== -1) {
        taskListUpdate[index] = taskEditNew;
      }

      return { ...state, taskList: taskListUpdate };
    }

    default:
      return { ...state };
  }
};
