import React from 'react';
import './App.css';
import {Container,Button, Row,Col,Card, Modal} from 'react-bootstrap';

class App extends React.Component{
  constructor(){
    super()
    this.state = {
      todoList:[],
      currentlyAddingTodoItemName:'',
      editTodoItem: false,
      editTodoItemName: null,
      selectedIndexToEdit: 0,
    }
  }
  
  componentDidMount(){
    this.data =JSON.parse( sessionStorage.getItem('todoListStateData') );
    console.log(this.data)
    if(sessionStorage.getItem('todoListStateData'))
      this.setState({todoList:this.data});
  }
  
  componentDidUpdate(){
    sessionStorage.setItem('todoListStateData',JSON.stringify(this.state.todoList))
  }

  //To check duplication of todo element
  duplicationCheck = async (todoItemName) => {
    for(let i = 0; i < this.state.todoList.length; i++){
      if (todoItemName === this.state.todoList[i].todoItemName){
        return true
      }
    }
    return false
  }

  //Add todo item to the list
	addTodoList = async () => {
    if(await this.duplicationCheck(this.state.currentlyAddingTodoItemName) === true){
      alert("Already present in the todo list")
      return
    }
    let todoListCopy = this.state.todoList.slice();
    let listToBeAdded = {
      todoItemName: this.state.currentlyAddingTodoItemName,
      isCompleted: false,
    }
		todoListCopy.push(listToBeAdded);
		this.setState({
			todoList:todoListCopy,
			currentlyAddingTodoItemName:''
		});
  }
  
  // To handle the change of text inside input box
	handleInputBoxChange = (change) => {
		this.setState({currentlyAddingTodoItemName:change.target.value});
  }

  // To handle the change of text inside edit box
  handleEditBoxChange = (change) => {
		this.setState({editTodoItemName:change.target.value});
  }

  // Save changes of todo item after editing it
  saveChanges = async() => {
    if(this.state.editTodoItemName === '' || this.state.editTodoItem === null || this.state.editTodoItemName === this.state.todoList[this.state.selectedIndexToEdit].todoItemName){
      alert("Please enter/change something")
      return
    }
    if(await this.duplicationCheck(this.state.editTodoItemName) === true){
      alert("Already present in the todo list")
      return
    }
    this.setState(({todoList}) => ({
      todoList: [
          ...todoList.slice(0,this.state.selectedIndexToEdit),
          {
              ...todoList[this.state.selectedIndexToEdit],
              todoItemName: this.state.editTodoItemName,
          },
          ...todoList.slice(this.state.selectedIndexToEdit + 1)
      ]
    }));
    this.setState({editTodoItem:false,editTodoItemName:null})
  }
  
  // Delete todo item from the list
	deleteFromTodoList = async (index) => {
		let todoListCopy = this.state.todoList.slice();
		todoListCopy.splice(index,1);
		this.setState({
			todoList:todoListCopy,
    });
    console.log(this.state)
  }

  // Change todo item state to completed or pending
  changeTodoState = (index,state) => {
    let todoListCopy = this.state.todoList.slice();
    todoListCopy[index].isCompleted = state;
    this.setState({
			todoList:todoListCopy,
    });
    console.log(this.state)	
  }
  
	render(){
		let todoList = this.state.todoList.map((value,index) => {
      if(value.isCompleted === false ){
        return(
          <div  key={index}>
            
            <div align='left'>
              <h5>{value.todoItemName}</h5>
            </div>
            <div align='left'>
              <button style = {{color:'black'}} onClick={() => {
                this.setState({selectedIndexToEdit:index,editTodoItem:true,editTodoItemName:value.todoItemName})
                console.log(this.state)
              }} class="btn"><i class="fa fa-edit"></i></button>
              <button style = {{color:'red'}} onClick={() => {this.deleteFromTodoList(index)}}class="btn"><i class="fa fa-trash"></i></button>
              <button style = {{color:'green'}} onClick={() => {this.changeTodoState(index,true)}} class="btn"><i class="fa fa-check-circle"></i></button>
            </div>
          </div>
        );
      }else{
        return(null);
      }
    });
    todoList=todoList.reverse();
    
    let completedList = this.state.todoList.map((value,index) => {
      if(value.isCompleted === true ){
        return(
          <div  key={index} >
            
            <div align='left'>
              <h5 style={{textDecorationLine:'line-through'}}>{value.todoItemName}</h5>
            </div>
            <div align='left'>
              <button style = {{color:'gray'}} onClick={() => {this.changeTodoState(index,false)}} class="btn"><i class="fa fa-undo"></i></button>
              <button style = {{color:'red'}} onClick={() => {this.deleteFromTodoList(index)}}class="btn"><i  class="fa fa-trash"></i></button>
            </div>
          </div>
        );
      }else{
        return(null);
      }
    });
    completedList=completedList.reverse();
	
  	return(
    	<div className="container" id="cont1">
        
        <div id='logoHeader' >
          <img src='/assets/mangoleapLogo.png' alt="logo"/>
        </div>
        <h3 id='textHeader'>TODO React App</h3>
        <div id='inputBoxDiv' >
            <input type="text" id='inputBox' value={this.state.currentlyAddingTodoItemName} onChange={this.handleInputBoxChange} placeholder="Enter a new todo :)"/>  
        </div>
        <div id='addTodoButton'>
          <button className="btn btn-primary"  onClick={()=>{
            if(this.state.currentlyAddingTodoItemName !== '' && this.state.currentlyAddingTodoItemName !== null) 
            this.addTodoList();
            else
            alert("Please enter some Todo activity")
            }}>Add Todo</button>
        </div>
        <br></br>
        {this.state.todoList.length === 0? null :(
        <Container>
          <Row>
            <Col>
              <center>
              <Card className='text-center' style={{width: '18rem'}}>
                <Card.Body>
                  <Card.Title style={{color:'#3175B0'}}>To-Do</Card.Title>
                  <Card.Text className='scrll'>
                    <div className='scrollBar'>{todoList}</div>
                  </Card.Text>
                </Card.Body>
              </Card>
              </center>
            </Col>
            <Col>
            <center>
              <Card className='text-center' style={{ width: '18rem' }}>
                <Card.Body>
                  <Card.Title style={{color:'green'}}>Completed</Card.Title>
                  <Card.Text>
                  <div className='scrollBar'>{completedList}</div>
                  </Card.Text>
                </Card.Body>
              </Card>
              </center>
            </Col>
          </Row>
        </Container>)}
        <Modal show={this.state.editTodoItem} onHide={() => {this.setState({editTodoItem:false,editTodoItemName:null})}}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Todo Item Name</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <input type="text" id='inputBox' value={this.state.editTodoItemName} onChange={this.handleEditBoxChange} placeholder="Edit todo :)"/>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => {this.setState({editTodoItem:false,editTodoItemName:null})}}>
            Close
          </Button>
          <Button variant="primary" onClick={() => {this.saveChanges()}}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
      </div>
    );
  }
}

export default App;