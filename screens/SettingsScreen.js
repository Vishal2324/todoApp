import React from 'react';
import { Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View, } from 'react-native';

export default class SettingsScreen extends React.Component {
  static navigationOptions = {
    title: 'Completed Tasks',
  };

  render() {
    return (
      <ScrollView style={styles.container}>
        <View>
          <Text>Completed Tasks List</Text>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
});
