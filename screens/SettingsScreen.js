import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  Modal,
  Switch
} from 'react-native';
import { connect } from 'react-redux';
import { addTodo, deleteTodo, updateTodo } from '../store/reducers/todo_reducer';

class SettingsScreen extends React.Component {
  constructor () {
    super();
    this.state = {
      newname : '',
      taskName : '',
      taskId : '',
      status : '',
      modalVisible : false
    }
  }

  static navigationOptions = {
    title: 'Completed Tasks',
  };

  updateTaskName = (data) => {
    this.setState({
        taskName : data.taskName,
        taskId : data.taskId,
        status : data.status,
        modalVisible : true
    })
  }

  closeModal = () => {
    let obj = {
      taskName : this.state.taskName,
      taskId : this.state.taskId,
      status : this.state.status,
    }
    this.props.updateTodo(obj);
    this.setState({
      modalVisible : false
    })
  }

  changeTaskStatus = (e) => {
    if(this.state.status == 'A'){
      this.setState({status : 'C'})
    }else{
      this.setState({status : 'A'})
    }
  }

  render() {
    return (
      <View style={styles.container}>
      <Modal
        visible={this.state.modalVisible}
        transparent={false}
        animationType="slide" 
        >
        <View style={styles.modalStyle}>
          <Text>{this.state.taskId}</Text>
          <TextInput 
              style={styles.inputStyle} 
              onChangeText={(newname)=> this.setState({taskName : newname})}
              value={this.state.taskName}
            />
            <Switch style={styles.switch} value={this.state.status == 'A' ? false : true} onValueChange={this.changeTaskStatus} />
            <Text>{this.state.status == 'A' ? 'Task is Active' : 'Task Completed'}</Text>
            <Button 
              title="UPDATE TASK"
              color="blue"
              style={styles.buttonStyle}
              onPress={this.closeModal}
            />
        </View>
      </Modal>
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        <View style={styles.welcomeContainer}>
          {this.props.todos.filter(x => x.status == 'C').map((item, i)=> 
            <View key={item.taskId} style={styles.taskStyle}>
              <Text style={{textTransform: 'uppercase'}}>{item.taskId + "  -  " + item.taskName}</Text>  
              <Switch style={styles.switch} value={item.status == 'A' ? false : true} disabled={true}/>
              <Text>{item.status == 'A' ? 'Task is Active' : 'Task Completed'}</Text>
              <Button 
                title="EDIT"
                color="yellow"
                style={styles.buttonStyle}
                onPress={() => {this.updateTaskName(item)}}
              />
              <Button 
                title="DELETE"
                color="red"
                style={styles.buttonStyle}
                onPress={()=> this.props.deleteTodo(item.taskId)}
              />
            </View>
          )}
          {this.props.todos.length == 0 && <Text>No Tasks to show, Please add one.</Text>}
        </View>
      </ScrollView>
    </View>
    );
  }
}

function mapStateToProps (state) {    
  return {
      todos: state.todo_reducer.todos
  }
}

function mapDispatchToProps (dispatch) {    
  return {
    addTodo: (todo) => dispatch(addTodo(todo)),
    deleteTodo: (todo) => dispatch(deleteTodo(todo)),
    updateTodo: (todo) => dispatch(updateTodo(todo)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SettingsScreen)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ddd',
    padding: 20
  },
  taskStyle: {
    borderColor: '#888',
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
  },inputStyle: {
    height: 40,
    borderColor: '#000',
    borderWidth: 1,
    marginTop: 10,
    padding: 5
  },modalStyle: {
    paddingTop: 100,
    paddingLeft: 30,
    paddingRight: 30,
    backgroundColor: '#888',
    height: '100%'
  },
   switch : {
    marginTop: 10
  }
});
