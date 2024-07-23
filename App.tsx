import React from 'react'
import { Provider } from 'react-redux'
import store from './android/app/src/redux/store'
import TodoScreen from './android/app/src/screens/TodoScreen'
import ExpenseScreen from './android/app/src/screens/ExpenseScreen'
const App = () => {
 return (
    <Provider store={store}>
     {/* <TodoScreen /> */}
     <ExpenseScreen/>
    </Provider>
 )
}
export default App