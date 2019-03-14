import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  Button
} from 'react-native';
import { WebBrowser } from 'expo';

import { MonoText } from '../components/StyledText';

import AddToDoButton from '../components/add_todo_button';
import { connect } from 'react-redux';
import { addTodo, deleteTodo, updateTodo } from '../store/reducers/todo_reducer';

class NewScreen extends React.Component {
    constructor() {
      super();
      this.state = {
        taskname : '',
        taskdate : ''
      }  
    }

    static navigationOptions = {
        title: 'Add New Task',
    };

    addNewTask = () => {
      let tdate = new Date(parseInt(this.state.taskdate.split('-')[2]),(parseInt(this.state.taskdate.split('-')[1])-1),parseInt(this.state.taskdate.split('-')[0]));
      console.log(tdate);
      if (this.state.taskname.trim() == '' && this.state.taskdate.trim() == '') {
        alert('Task Name & Due Date Required!');
        return false;
      } if (this.state.taskname.trim() == '') {
        alert('Task Name Required!');
        return false;
      } if (this.state.taskname.trim() != '' && this.state.taskname.length <= 2) {
        alert('Enter valid task name!');
        return false
      }if (this.state.taskdate.trim() == '') {
        alert('Due Date Required!');
        return false;
      }if (this.state.taskdate.length != 10) {
        alert('Enter Valid Due Date');
        return false;
      }if(tdate < new Date()){
        alert('Do not enter past date in Due Date');
      } else {
        let obj = {
          taskId : this.props.todos.length + 1,
          taskName : this.state.taskname,
          status : 'A'
        }
        this.props.addTodo(obj);
        this.setState({taskname : ''},
        ()=>{
          alert('task added succesfully!');
        })
      }
    }

    render() {
        return (
        <View style={styles.container}>
          <Text>Enter Task Name that needs to be done</Text>
            <TextInput 
              style={styles.inputStyle} 
              onChangeText={(taskname)=> this.setState({taskname})}
              value={this.state.taskname}
            />
            <Text>Due Date : </Text>
            <TextInput 
              style={styles.inputStyle} 
              onChangeText={(taskdate)=> this.setState({taskdate})}
              value={this.state.taskdate}
            />
            <Text>Note : Date pattern must be 'DD-MM-YYYY'</Text>
            <Button 
              title="ADD"
              color="#841584"
              style={styles.buttonStyle}
              onPress={this.addNewTask}
            />
        </View>
        );
    }

    _maybeRenderDevelopmentModeWarning() {
        if (__DEV__) {
        const learnMoreButton = (
            <Text onPress={this._handleLearnMorePress} style={styles.helpLinkText}>
            Learn more
            </Text>
        );

        return (
            <Text style={styles.developmentModeText}>
            Development mode is enabled, your app will be slower but you can use useful development
            tools. {learnMoreButton}
            </Text>
        );
        } else {
        return (
            <Text style={styles.developmentModeText}>
            You are not in development mode, your app will run at full speed.
            </Text>
        );
        }
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

export default connect(mapStateToProps, mapDispatchToProps)(NewScreen)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 100,
    backgroundColor: '#ddd',
  },
  inputStyle: {
    height: 40,
    borderColor: '#000',
    borderWidth: 1,
    marginTop: 10,
    marginBottom: 10,
    padding: 5
  },
  buttonStyle: {
    borderColor: '#000',
    borderWidth: 1,
    height: 40,
  }
});
