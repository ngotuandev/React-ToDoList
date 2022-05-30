import {
  ADD_TASK,
  CHANGE_THEME,
  CHECK_TASK,
  DELETE_TASK,
  EDIT_TASK,
  SET_TASK,
  UPDATE_TASK,
} from "../constants/todo.constants";

export const handleChangeTheme = (payload) => ({
  type: CHANGE_THEME,
  payload,
});

export const deleteTask = (payload) => ({
  type: DELETE_TASK,
  payload,
});

export const checkTask = (payload) => ({
  type: CHECK_TASK,
  payload,
});

export const setTask = (payload) => ({
  type: SET_TASK,
  payload,
});

export const addTask = (payload) => ({
  type: ADD_TASK,
  payload,
});

export const editTask = (payload) => ({
  type: EDIT_TASK,
  payload
})

export const updateTask = (payload) => ({
  type: UPDATE_TASK,
  payload
})


