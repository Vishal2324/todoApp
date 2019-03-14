import React from 'react';
import { Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View, } from 'react-native';

export default class LinksScreen extends React.Component {
  static navigationOptions = {
    title: 'Active Tasks',
  };

  render() {
    return (
      <ScrollView style={styles.container}>
        <View>
          <Text>Active Task List</Text>
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
