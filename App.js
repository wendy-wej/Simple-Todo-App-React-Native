import React from 'react';
import { useState } from 'react';
import { KeyboardAvoidingView, Platform, StyleSheet, Text, View, TextInput, TouchableOpacity, Keyboard, ScrollView } from 'react-native';
import Task from './Components/Tasks';

export default function App() {
  const [task, setTask] = useState();
  const [taskItems, setTaskItems] = useState([])

  const handleAddTask = () => {
    Keyboard.dismiss();
    setTaskItems([...taskItems, task])
    setTask(null);
  }

  const completeTask = (index) => {
    let itemsCopy = [...taskItems];
    itemsCopy.splice(index, 1);
    setTaskItems(itemsCopy);
  }
  return (
    <View style={styles.container}>
      {/* Added this scroll view to enable scrolling when list gets longer than the page */}
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1
        }}
        keyboardShouldPersistTaps='handled'
      >
      
      {/* Creating Tasks for Today*/}
      <View style={styles.tasksWrapper}>
        <Text style={styles.sectionTitle}>Tasks for Today</Text>

        <View style= {styles.items}>
          {/* This is where the tasks will go */}
          {
            taskItems.map((item, index) => {
              return( 
                <TouchableOpacity key={index} onPress= {() =>completeTask(index)}>
              <Task text = {item}/>
              </TouchableOpacity>
              )
            })
          }
          {/*
            <Task text = {'First Task'} />
            <Task text = {'Second Task'}/>
            <Task text = {'Third Task'}/>
        */}
        </View>
      </View>

      </ScrollView>

      <KeyboardAvoidingView
        behaviour = {Platform.OS === "ios"? "padding":"height"}
        style = {styles.writeTaskWrapper}
        >

          <TextInput style ={styles.input} placeholder={'Enter New Task...'} value = {task} onChangeText={text => setTask(text)}/>

        <TouchableOpacity onPress={() => handleAddTask()}>
          <View style = {styles.addWrapper}>
            <Text style = {styles.addText}>+</Text>
          </View>
        </TouchableOpacity>
      </KeyboardAvoidingView>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffe8f3',
  },

  tasksWrapper: {
    paddingTop: 80,
    paddingHorizontal: 20,
  },

  sectionTitle: {
    fontSize: 28,
    fontWeight:'bold',
  },

  items: {
    marginTop: 30,
  },

  writeTaskWrapper: {
    position: 'absolute',
    bottom: 60,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },

  input: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: '#FFFFFF',
    borderRadius: 40,
    borderColor :'#e4a1f5',
    borderWidth: 1,
    width:250,
  },

  addWrapper: {
    width: 60,
    height: 60,
    backgroundColor: '#FFFFFF',
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor :'#e4a1f5',
    borderWidth: 1,
  },
  
  addText:{
    fontSize: 30,
  }
});
