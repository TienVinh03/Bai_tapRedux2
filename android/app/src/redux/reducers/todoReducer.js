import { createSlice } from "@reduxjs/toolkit";
import { addTodoAPI, deleteTodoApi, updateTodoApi,toggleTodoApi,fetchTodos } from "../actions/todoAction";
//1. khai báo khởi tạo state
const initialState = {
    listTodo :[] // chứa danh sách công việc
}
//2. thiết lập cho reducer và định nghĩa các action
const todoSlice = createSlice({
    name : 'todo',
    initialState,
    reducers:{
        addTodo (state, action){
            state.listTodo.push( action.payload );
        },
          deleteTodo (state, action){
            state.listTodo = state.listTodo.filter(row => row.id !== action.payload);
 },updateTodo (state, action){
    // lấy tham số truyền vào
    const {id, title,description,total,date,type} = action.payload;
    // tìm bản ghi phù hợp với tham số truyền vào
    const todo = state.listTodo.find(row => row.id === id);
    // update
    if(todo){
        todo.title = title; // gán giá trị
        todo.description = description; // gán giá trị
        todo.total = total; // gán giá trị
        todo.date = date; // gán giá trị
        todo.type = type; // gán giá trị
    }
},   toggleTodoStatus(state, action) {
    // tìm các todo, nếu cái nào phù hợp thì cập nhật trạng thái
    const todo = state.listTodo.find(row => row.id === action.payload);
    if (todo) {
      todo.type = !todo.type;
    }
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
       builder.addCase(updateTodoApi.fulfilled, (state, action)=>{
        // lấy tham số truyền vào
        // console.log(action);
        const { id, title,date,type,description,total } = action.payload;
        // tìm bản ghi phù hợp với tham số truyền vào
        const todo = state.listTodo.find(row => row.id === id);
        // update
        if (todo ) {
            todo.title = title; // gán giá trị
            todo.date = date;
            todo.type = type;
            todo.description = description;
            todo.total = total

        }
  })
  .addCase(updateTodoApi.rejected, (state, action) => {
        // Xử lý khi yêu cầu Sửa todo bị từ chối hoặc xảy ra lỗi
        console.log('Update todo rejected:', action.error.message);
});
});

 },
 
});
// export các thành phần để bên screen có thể sử dụng
export const {addTodo,deleteTodo,updateTodo,toggleTodoStatus} = todoSlice.actions;
export default todoSlice.reducer;