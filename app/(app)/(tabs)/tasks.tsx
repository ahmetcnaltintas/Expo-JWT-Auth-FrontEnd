import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

const Tasks = ({ navigation }) => {
  const [taskText, setTaskText] = useState('');
  const [priority, setPriority] = useState('medium');

  const handleSave = () => {
    // Burada görev kaydetme işlemini gerçekleştirin
    // Örneğin: saveTask({ text: taskText, priority });
    console.log('Görev kaydedildi:', { text: taskText, priority });
    navigation.goBack(); // Ana sayfaya geri dön
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <Text style={styles.title}>Yeni Görev Ekle</Text>
      
      <TextInput
        style={styles.input}
        placeholder="Görev açıklaması..."
        value={taskText}
        onChangeText={setTaskText}
        multiline
      />

      <View style={styles.priorityContainer}>
        <Text style={styles.priorityTitle}>Öncelik:</Text>
        <View style={styles.priorityButtons}>
          <TouchableOpacity
            style={[styles.priorityButton, priority === 'low' && styles.selectedPriority]}
            onPress={() => setPriority('low')}
          >

            <Text style={styles.priorityButtonText}>Orta</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.priorityButton, priority === 'high' && styles.selectedPriority]}
            onPress={() => setPriority('high')}
          >
            <Text style={styles.priorityButtonText}>Yüksek</Text>
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <MaterialIcons name="check" size={24} color="#FFFFFF" />
        <Text style={styles.saveButtonText}>Kaydet</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
};

export default Tasks;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F5F5F5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 15,
    fontSize: 16,
    marginBottom: 20,
    minHeight: 100,
    textAlignVertical: 'top',
  },
  priorityContainer: {
    marginBottom: 20,
  },
  priorityTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  priorityButtons: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  priorityButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    backgroundColor: '#E0E0E0',
  },
  selectedPriority: {
    backgroundColor: '#2196F3',
  },
  priorityButtonText: {
    color: '#333',
    fontWeight: 'bold',
  },
  saveButton: {
    backgroundColor: '#4CAF50',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    borderRadius: 8,
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
  },
});