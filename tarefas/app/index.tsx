import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet } from 'react-native';

export default function App() {
  const [tarefa, setTarefa] = useState('');
  const [listaTarefas, setListaTarefas] = useState([]);
  const [mostrarTarefas, setMostrarTarefas] = useState(false);

  const adicionarTarefa = () => {
    if (tarefa.trim() !== '') {
      setListaTarefas([...listaTarefas, { id: Date.now().toString(), nome: tarefa }]);
      setTarefa('');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lista de Tarefas</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite uma nova tarefa"
        value={tarefa}
        onChangeText={setTarefa}
      />
      <TouchableOpacity style={styles.button} onPress={adicionarTarefa}>
        <Text style={styles.buttonText}>Adicionar Tarefa</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.button, styles.secondaryButton]}
        onPress={() => setMostrarTarefas(!mostrarTarefas)}
      >
        <Text style={styles.buttonText}>{mostrarTarefas ? 'Ocultar Tarefas' : 'Listar Tarefas'}</Text>
      </TouchableOpacity>
      {mostrarTarefas && (
        <FlatList
          data={listaTarefas}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <Text style={styles.tarefa}>{item.nome}</Text>}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'g',
  },
  title: {
    fontSize: 50,
    fontWeight: 'bold',
    marginBottom: 70,
    textAlign: 'center',
    color: 'red',
  },
  input: {
    borderWidth: 5,
    borderColor: 'black',
    padding: 20,
    marginBottom: 70,
    borderRadius:  10,
    backgroundColor: 'white',
  },
  button: {
    backgroundColor: 'red',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  secondaryButton: {
    backgroundColor: '',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 30,
    fontWeight: 'bold',
  },
  tarefa: {
    fontSize: 20,
    marginTop: 10,
    padding: 10,
    backgroundColor: '#bbdefb',
    borderRadius: 5,
  },
});