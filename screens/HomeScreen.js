import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Button,
  TextInput,
  Modal,
  Switch
} from 'react-native';
import { CheckBox } from 'native-base';
import { WebBrowser, Icon } from 'expo';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';
import { MonoText } from '../components/StyledText';

import AddToDoButton from '../components/add_todo_button';
import { connect } from 'react-redux';
import { addTodo, deleteTodo, updateTodo } from '../store/reducers/todo_reducer';

class HomeScreen extends React.Component {
  constructor () {
    super();
    this.state = {
      newname : '',
      taskName : '',
      taskId : '',
      status : '',
      dueDate: '',
      modalVisible : false
    }
  }
  static navigationOptions = {
    title: 'All Tasks',
  };

  updateTaskName = (data) => {
    this.setState({
        taskName : data.taskName,
        taskId : data.taskId,
        status : data.status,
        dueDate: data.dueDate,
        modalVisible : true
    })
  }

  closeModal = () => {
    let obj = {
      taskName : this.state.taskName,
      taskId : this.state.taskId,
      status : this.state.status,
      dueDate : this.state.dueDate
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
    const monthArr = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    return (
       <View style={styles.container}>
        <Modal
          visible={this.state.modalVisible}
          transparent={false}
          animationType="slide" 
          >
          <View style={styles.modalStyle}>
            <Icon.Ionicons
                name={Platform.OS === 'ios' ? "ios-close-circle" : "md-close-circle"}
                size={26}
                style={styles.close}
                color={"#000000"}
                onPress={() => {this.setState({modalVisible : false})}}
              />
            <Text>{this.state.taskId}</Text>
            <TextInput 
                style={styles.inputStyle} 
                onChangeText={(newname)=> this.setState({taskName : newname})}
                value={this.state.taskName}
              />
              <Switch style={styles.switch} value={this.state.status == 'A' ? false : true} onValueChange={this.changeTaskStatus} />
              <Text>{this.state.status == 'A' ? 'Task is Active' : 'Task Completed'}</Text>
              {this.state.dueDate != '' && <Text>{'Due Date :  ' + this.state.dueDate.split('-')[0] + ' ' + monthArr[parseInt(this.state.dueDate.split('-')[1]) - 1] + ', ' + this.state.dueDate.split('-')[2]}</Text>}
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
            {this.props.todos.map((item)=> {
              var oneday = 1000 * 60 * 60 * 24;
              var today = new Date();
              var date_1 = today.getTime();
              var duedate = new Date(parseInt(item.dueDate.split('-')[2]),(parseInt(item.dueDate.split('-')[1])-1),parseInt(item.dueDate.split('-')[0]));
              var date_2 = duedate.getTime();
              var diff_ms = date_2 - date_1;
              var daysleft = Math.round(diff_ms/oneday);
              return(
                <View key={item.taskId} style={styles.taskStyle}>
                  <Text style={{textTransform: 'uppercase'}}>{item.taskId + "  -  " + item.taskName}</Text>  
                  <Switch style={styles.switch} value={item.status == 'A' ? false : true} disabled={true}/>
                  <Text>{item.status == 'A' ? 'Task is Active' : 'Task Completed'}</Text>
                  <Text>{daysleft < 0 ? 'Due Date Expired' : 'Days left : ' + daysleft}</Text>
                  <Icon.Ionicons
                    name={Platform.OS === 'ios' ? "ios-create" : "md-create"}
                    size={26}
                    style={styles.edit}
                    color={"orange"}
                    onPress={() => {this.updateTaskName(item)}}
                  />
                  <Icon.Ionicons
                    name={Platform.OS === 'ios' ? "ios-trash" : "md-trash"}
                    size={26}
                    style={styles.delete}
                    color={"red"}
                    onPress={()=> this.props.deleteTodo(item.taskId)}
                  />
                </View>
              )
            })}
            {this.props.todos.length == 0 && <Text>No Tasks to show, Please add one.</Text>}
          </View>
        </ScrollView>
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

  _handleLearnMorePress = () => {
    WebBrowser.openBrowserAsync('https://docs.expo.io/versions/latest/guides/development-mode');
  };

  _handleHelpPress = () => {
    WebBrowser.openBrowserAsync(
      'https://docs.expo.io/versions/latest/guides/up-and-running.html#can-t-see-your-changes'
    );
  };
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
)(HomeScreen)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ddd',
    padding: 20
  },
  taskStyle: {
    backgroundColor: '#fff',
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
  },
  delete: {
    position: "absolute",
    right: 10,
    top: 20
  },
  edit: {
    position: "absolute",
    right: 40,
    top: 20
  },
  close: {
    position: "absolute",
    right: 20,
    top: 40
  }
});
