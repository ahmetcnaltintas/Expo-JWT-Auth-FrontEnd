import axios from 'axios';
import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StyleSheet, View, FlatList, Text, TouchableOpacity } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useRouter } from 'expo-router';

export default function IndexPage() {
  const [tasks, setTasks] = useState([]);
  const router = useRouter();

  
  const handlePress = (task) => {
    router.push({
      pathname: `/taskDetail/${task.id}`, // Dinamik URL
      query: { // URL parametreleri
        title: task.title,
        description: task.description,
      },
    });
  };
  

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        if (!token) {
          throw new Error('Token bulunamadı');
        }

        const response = await axios.get('http://127.0.0.1:8000/api/tasks', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (response.status === 200) {
          setTasks(response.data);
        } else {
          console.log('Görevler alınırken bir hata oluştu:', response.data);
        }
      } catch (error) {
        console.error('API isteği sırasında bir hata oluştu:', error.response ? error.response.data : error.message);
      }
    };

    fetchTasks();
  }, []);

  const toggleTodo = async (id) => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (!token) {
        throw new Error('Token bulunamadı');
      }
  
      const task = tasks.find(task => task.id === id);
      if (!task) {
        console.log('Görev bulunamadı');
        return;
      }
  
      const updatedTask = {
        ...task,
        completed: !task.completed,
      };
  
      const response = await axios.put(`http://127.0.0.1:8000/api/tasks/${id}`, updatedTask, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
  
      if (response.status === 200) {
        setTasks(prevTasks => prevTasks.map(task => task.id === id ? response.data : task));
      } else {
        console.log('Görev güncellenirken bir hata oluştu:', response.data);
      }
    } catch (error) {
      console.error('API isteği sırasında bir hata oluştu:', error.response ? error.response.data : error.message);
    }
  };

 
  const renderTodoItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.todoItem}
      onPress={() => handlePress(item)}
    >
      <MaterialIcons
        name={item.completed ? 'check-box' : 'check-box-outline-blank'}
        size={24}
        color={item.completed ? '#4CAF50' : '#757575'}
        onPress={() => toggleTodo(item.id)}
      />
      <Text style={[styles.todoText, item.completed && styles.completedTodoText]}>
        {item.title}
      </Text>
    </TouchableOpacity>
  );
  

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Görevler</Text>
      <FlatList
        data={tasks}
        renderItem={renderTodoItem}
        keyExtractor={(item) => item.id.toString()} 
        style={styles.todoList}
      />
      <TouchableOpacity 
        style={styles.addButton}
        onPress={() => router.push('/tasks')}
      >
        <MaterialIcons name="add" size={30} color="#FFFFFF" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F5F5F5',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  todoList: {
    flex: 1,
  },
  todoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    elevation: 2,
  },
  todoText: {
    marginLeft: 10,
    fontSize: 16,
    color: '#333',
  },
  completedTodoText: {
    textDecorationLine: 'line-through',
    color: '#757575',
  },
  addButton: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    backgroundColor: '#2196F3',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
});