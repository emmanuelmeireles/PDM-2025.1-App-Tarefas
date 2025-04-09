import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Parse from 'parse/react-native';

Parse.setAsyncStorage(AsyncStorage);
Parse.initialize(
  'bWUyhKYu77rn6F6DWJnZ2WWQ4vHhKJ91rg5j4pIb',
  'cf5SLn1oFj7Jq0m3e3BqsIR1IqarxaBFn6Z2wbF6'
);
Parse.serverURL = 'https://parseapi.back4app.com';

export default function App() {
  const [tarefa, setTarefa] = useState('');
  const [listaTarefas, setListaTarefas] = useState([]);
  const [mostrarTarefas, setMostrarTarefas] = useState(false);

  const adicionarTarefa = async () => {
    if (tarefa.trim() !== '') {
      const Tarefa = Parse.Object.extend('Tarefa');
      const novaTarefa = new Tarefa();
      novaTarefa.set('nome', tarefa);

      try {
        const resultado = await novaTarefa.save();
        setListaTarefas([...listaTarefas, { id: resultado.id, nome: tarefa }]);
        setTarefa('');
        console.log('Tarefa salva com sucesso!');
      } catch (error) {
        console.error('Erro ao salvar tarefa:', error.message);
      }
    }
  };

  const listarTarefas = async () => {
    const Tarefa = Parse.Object.extend('Tarefa');
    const query = new Parse.Query(Tarefa);

    try {
      const resultados = await query.find();
      const tarefas = resultados.map((item) => ({
        id: item.id,
        nome: item.get('nome'),
      }));
      setListaTarefas(tarefas);
      setMostrarTarefas(true);
      console.log('Tarefas carregadas com sucesso!');
    } catch (error) {
      console.error('Erro ao carregar tarefas:', error.message);
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
        onPress={listarTarefas}
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
    backgroundColor: 'lightgray',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: 'black',
  },
  input: {
    borderWidth: 1,
    borderColor: 'black',
    padding: 10,
    marginBottom: 20,
    borderRadius: 5,
    backgroundColor: 'white',
  },
  button: {
    backgroundColor: 'blue',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  secondaryButton: {
    backgroundColor: 'gray',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  tarefa: {
    fontSize: 16,
    marginTop: 10,
    padding: 10,
    backgroundColor: '#bbdefb',
    borderRadius: 5,
  },
});