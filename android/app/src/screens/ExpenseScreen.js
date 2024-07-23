import { useDispatch, useSelector } from "react-redux";
import { addTodo, deleteTodo, updateTodo,toggleTodoStatus } from "../redux/reducers/todoReducer";
// import { addTodo, deleteTodo, updateTodo,toggleTodoStatus } from "../redux/reducers/todoReducer";
import { Button, Image, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import { useEffect, useState } from "react";
import { fetchTodos, deleteTodoApi, addTodoAPI,updateTodoApi} from '../redux/actions/todoAction'; 
import { addExpense } from "../redux/reducers/expenseReducer";
import TextInputCustom from "../components/inputCustom";
const TodoScreen  =()=>{
    //1. Khai báo các state để thực hiện thêm
    const [title, setTitle] = useState('');
    const [description,setDescription] = useState('');
    const [date,setDate] = useState('');
    const [total,setTotal] = useState('');
    const [type,setType]= useState(true);
    const [editTitle, setEditTitle] = useState('');// chuỗi tiêu đề
    const [editdescription,seteditDescription] = useState('');
    const [editdate,seteditDate] = useState('');
    const [edittotal,seteditTotal] = useState('');
    const [edittype,setedtType]= useState(true);
    const [idEdit, setIdEdit] = useState(null); //lưu id bản ghi cần sửa
    const [search,setsearch] = useState('');

    const [totalChi,setTotalChi] = useState(0);
    const [totalThu,setTotalThu] = useState(0);
    const handleEdit = (id, title,description,total,date,type) =>{
        // hàm này để  ẩn hiện form sửa
        setEditTitle(title);
        seteditDescription(description);
        seteditTotal(total);
        seteditDate(date);
        setedtType(type);
        setIdEdit(id);
    }

    useEffect(() => {
        dispatch(fetchTodos());
      }, [dispatch]);
    // &&editdescription.trim() !== '' &&edittotal.trim() !== '' &&editdate.trim() !== ''
    // hàm lưu kết quả sửa
    const handleUpdate =()=>{
        if(editTitle.trim() !== '' ||editdescription.trim() || edittotal.trim() !== '' ||editdate.trim() !== '' ){
            // có nội dung sửa

            let dulieuUpdate = {title:editTitle,description:editdescription,date:editdate,total:edittotal,type:edittype};
            dispatch( updateTodoApi ({id: idEdit,data:dulieuUpdate }) ).then((result)=>{
                console.log('Todo update successfully!');
                    console.log(result);
                setEditTitle('');
            seteditDescription('');
            seteditTotal('');
            setedtType('');
            seteditDate('');
            setIdEdit(null);
            
            }).catch((error)=>{
                console.error('Error update todo:', error);
            })
            
        }
    }
   
    //lấy  danh sách dữ liệu
    // const  listTodo =  useSelector(state=>state.listTodo.listTodo);
    const  listTodo =  useSelector(state=>state.listTodoStore.listTodo);

    const TotalMoney =()=>{
        let totalThu =0;
        let totalChi=0;
        listTodo.forEach(expense=>{
            if(expense.type==false){
                totalThu+= parseFloat(expense.total);
            }else if(expense.type==true){
                totalChi+=parseFloat(expense.total);
            }
        })
        setTotalChi(totalThu);
        setTotalThu(totalChi);
    }

    useEffect(()=>{
        TotalMoney();
       
    },[listTodo]);

    const listSearch = listTodo.filter(expense=>
        expense.title.toLowerCase().includes(search.toLowerCase())
    )

  



  
    // const listExpense = useSelector(state=>state.listExpense.listExpense);
    // lấy đối tượng để điều khiển các action
    // const dispatch = useDispatch();// của redux
    const dispatch = useDispatch();
    // hàm xử lý việc thêm
    // const handleAddTodo = ()=>{
    //     let duLieuThem = { id: Math.random().toString(), title: title };
    //     dispatch( addTodo ( duLieuThem )  );
    // }
    // const addListExpense = ()=>{
    //     let dataAdd = {id:Math.random().toString(),title:title,description:description,date:date,total:total,type:type}
    //     dispatch( addTodo ( dataAdd )  );
    // }

    const addListExpense = ()=>{
        let duLieuThem = {  title: title ,title:title,description:description,date:date,total:total,type:type};
        // dispatch( addTodo ( duLieuThem )  );
        dispatch(addTodoAPI(duLieuThem))
        .then((result) => {
            // console.log(result);
            console.log('Todo add successfully!');
        })
        .catch((error) => {
            console.error('Error add todo:', error);
        });
    }

    // const DeleteListExpense = (id)=>{
    //     dispatch(deleteTodo (id));
    // }
    const DeleteListExpense =async (id)=>{
        dispatch(deleteTodoApi(id))
            .then((result) => {
                console.log('Todo deleted successfully!');
            })
            .catch((error) => {
                console.error('Error deleting todo:', error);
            });
    }
    const handleToggleTodo = id => {
        dispatch(toggleTodoStatus(id));
    };

    const statusthu= ()=>{
        setType(false);
    }
    const statustieu =()=>{
        setType(true);
    }

    // <TouchableOpacity style={{position:'absolute',right:10,top:10}} onPress={()=>DeleteListExpense(row.id)}>
    //         <Image source={require('../img/recyclebin.png')} style={{width:30,height:30}}/>
    //     </TouchableOpacity>
     
    return (

        


       
        <View style={{flex:1}}>
            <ScrollView>

                
           
        <TextInputCustom placeholder="Nhập tiêu đề" onChangeText={setTitle} lable='Title' />
        <TextInputCustom placeholder="Nhập mô tả" onChangeText={setDescription} lable='Decription'/>
        <TextInputCustom placeholder="Nhập ngày thu chi" onChangeText={setDate} lable='Date'/>
        <TextInputCustom placeholder="Nhập số tiền" onChangeText={setTotal} inputMode="numeric" lable='Total'/>
        
        <View style={{flexDirection:'row'}}>
               <Text >
            Loại chi tiêu :
        </Text>
        <TouchableOpacity onPress={statusthu}>
 <Text>
            Chi -   
        </Text>
            
        </TouchableOpacity>

       
        <TouchableOpacity onPress={statustieu}>
 <Text>
            Thu 
        </Text>
            
        </TouchableOpacity>
        </View> 
    
     
        <View style={{width: 100}}>
        <Button title="Thêm" onPress={addListExpense} />
        </View>
       

        <Text>Tổng số tiền : Thu : {totalThu} - Chi : {totalChi}</Text>
        <TextInput placeholder="Tìm kiếm theo tiêu đề" onChangeText={setsearch} value={search}/>
        {/* Hiện danh sách: */}

        
        
        {
        listSearch.map(row =>(
      <View key={row.id}
        style={{padding: 10, margin: 10, backgroundColor: 'cyan'}}>

            {
                      (idEdit === row.id)?
                          (<>
                          <Text>Title</Text>
                              <TextInputCustom
                                      value={editTitle}
                                      onChangeText={setEditTitle}
                                      onBlur={handleUpdate
                                      }
                                      
                                  />
                                   <Text>Decription</Text>
                                  <TextInputCustom
                                  value={editdescription}
                                  onChangeText={seteditDescription}
                                  onBlur={handleUpdate}
                               
                                  />
                                     <Text>Date</Text>
                                  <TextInputCustom
                                  value={editdate}
                                  onChangeText={seteditDate}
                                  onBlur={handleUpdate}
                                 
                                  />
                                     <Text >Total</Text>
                                  <TextInputCustom
                                  value={edittotal}
                                  onChangeText={seteditTotal}
                                  onBlur={handleUpdate}
                                  style={{marginBottom:10}}
                                  
                                  />
                                  
                                  {/* <Text>
            Loại chi tiêu :
        </Text>
        <Text>
            Thu -
        </Text>
        <Text>
            Chi
        </Text> */}

                                  
                                  
                                  <Button title="Update" onPress={handleUpdate} />
                          </>
                          )
                      :
                          (
                              <>
                              
                                <Text>Tiêu đề : {row.title} </Text>
        <Text>Mô tả : {row.description}</Text>
        <Text>Ngày : {row.date}</Text> 
        <Text>Tổng tiền : {row.total}</Text>
       
        <Text>Loại thu chi : 
             <TouchableOpacity onPress={() => handleToggleTodo(row.id)}>
              {row.type ?
                 <Text style={{ color: 'gray' }}>Thu</Text> :
                    <Text style={{ color: 'green' }}>Chi</Text>
               }
</TouchableOpacity>
           </Text>
        <TouchableOpacity style={{position:'absolute',right:10,top:10}} onPress={()=>DeleteListExpense(row.id)}>
            <Image source={require('../img/recyclebin.png')} style={{width:30,height:30}}/>
        </TouchableOpacity>
        {/* <TouchableOpacity onPress={() => handleToggleTodo(row.id)}>
              {row.type ?
                 <Text style={{ color: 'gray' }}>Thu</Text> :
                    <Text style={{ color: 'green' }}>Chi</Text>
               }
</TouchableOpacity> */}
                            <TouchableOpacity style={{position:'absolute',right:10,top:50}} onPress={() => handleEdit(row.id, row.title,row.description,row.total,row.date)}>
                                     <Image source={require('../img/edit.png')} style={{width:30,height:30}}/>
                                  </TouchableOpacity>

                              </>

                          )
                  }

        {/* <Text>{row.title} === {row.id}</Text>
        <Text>{row.description}</Text>
        <Text>{row.date}</Text>
        <Text>{row.type}</Text>
        <Text>{row.date}</Text>
        <TouchableOpacity style={{position:'absolute',right:10,top:10}} onPress={()=>DeleteListExpense(row.id)}>
            <Image source={require('../img/recyclebin.png')} style={{width:30,height:30}}/>
        </TouchableOpacity> */}



      </View> 
        ))
        }
     </ScrollView></View> 
    );
}
export default TodoScreen;