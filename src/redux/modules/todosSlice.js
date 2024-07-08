import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

/**
 * 2초 지연을 시키는 함수입니다 (비동기 작업).
 */
import { waitTwoSeconds } from "../../utils";

const mockPayloadCreator = async (payload, thunkAPI) => {
  await waitTwoSeconds();
  return payload;
};

export const __addToDo = createAsyncThunk("__addToDo", mockPayloadCreator);

export const __deleteTodo = createAsyncThunk("__deleteToDo", mockPayloadCreator);

const initialState = {
  loading: false,
  list: [],
};

const todosSlice = createSlice({
  name: "todos",
  initialState,
  extraReducers: {
    [__addToDo.pending]: (state) => {
      state.loading = true;
    },
    [__addToDo.fulfilled]: (state, action) => {
      state.loading = false;
      state.list.push(action.payload);
    },
    [__addToDo.rejected]: (state) => {
      state.loading = false;
    },

    [__deleteTodo.pending]: (state) => {
      state.loading = true;
    },
    [__deleteTodo.fulfilled]: (state, action) => {
      state.loading = false;
      state.list = state.list.filter((todo) => todo.id !== action.payload);
    },
    [__deleteTodo.rejected]: (state) => {
      state.loading = false;
    },
  },
});

export const { addTodo, deleteTodo } = todosSlice.actions;
export default todosSlice.reducer;
