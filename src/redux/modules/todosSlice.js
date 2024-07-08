import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

/**
 * 2초 지연을 시키는 함수입니다 (비동기 작업).
 */
import { waitTwoSeconds } from "../../utils";

const mockPayloadCreator = async (payload, thunkAPI) => {
  try {
    await waitTwoSeconds();
    return payload;
  } catch (e) {
    return thunkAPI.rejectWithValue(e.message);
  }
};

export const __addToDo = createAsyncThunk("__addToDo", mockPayloadCreator);

export const __deleteTodo = createAsyncThunk("__deleteToDo", mockPayloadCreator);

const initialState = {
  list: [],
};

const todosSlice = createSlice({
  name: "todos",
  initialState,
  extraReducers: {
    [__addToDo.fulfilled]: (state, action) => {
      state.list.push(action.payload);
    },
    [__deleteTodo.fulfilled]: (state, action) => {
      state.list = state.list.filter((todo) => todo.id !== action.payload);
    },
  },
});

export const { addTodo, deleteTodo } = todosSlice.actions;
export default todosSlice.reducer;
