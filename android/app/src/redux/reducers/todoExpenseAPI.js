import { createSlice } from "@reduxjs/toolkit";
import { addTodoAPI, deleteTodoApi, updateTodoApi,toggleTodoApi } from "../actions/todoAction";
//1. khai báo khởi tạo state
const initialState = {
   listTodo: [] // chứa danh sách công việc
}
//2. thiết lập cho reducer và định nghĩa các action
const todoSlice = createSlice({
   name: 'todo',
   initialState,
   reducers: {
     // làm việc với store cục bộ
       addTodo(state, action) {
         state.listTodo.push(action.payload);
     },
   },
   extraReducers: builder => {
         // đây là chỗ để viết các thao tác mở rộng, xử lý các trạng thái của promise
         builder.addCase(deleteTodoApi.fulfilled, (state, action) => {
            // Xóa todo
             state.listTodo = state.listTodo.filter(row => row.id !== action.payload);
            
        }) .addCase(deleteTodoApi.rejected, (state, action) => {
            // Xử lý khi yêu cầu xóa todo bị từ chối hoặc xảy ra lỗi
            console.log('Delete todo rejected:', action.error.message);
        });

        builder.addCase(addTodoAPI.fulfilled, (state, action)=>{
          console.log(action.payload);
            state.listTodo.push(action.payload);
        })
       .addCase(addTodoAPI.rejected, (state, action) => {
          // Xử lý khi yêu cầu thêm todo bị từ chối hoặc xảy ra lỗi
          console.log('Add todo rejected:', action.error.message);
});
    },
})
// export các thành phần để bên screen có thể sử dụng
export const { addTodo } = todoSlice.actions;
export default todoSlice.reducer;