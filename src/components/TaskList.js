import React, { useState } from 'react';
import { useCollection } from 'react-firebase-hooks/firestore';
import { db } from '../firebaseConfig'; // Ajuste o caminho conforme necessário
import { collection, addDoc, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { TextField, Button, List, ListItem, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete'; // Este é o import para o ícone de deletar

const TaskList = () => {
  const [newTask, setNewTask] = useState('');
  const [tasks, loading, error] = useCollection(collection(db, 'tasks'));

  const addTask = async () => {
    if (newTask.trim() === '') return;
    await addDoc(collection(db, 'tasks'), { text: newTask });
    setNewTask('');
  };

  const deleteTask = async (id) => {
    await deleteDoc(doc(db, 'tasks', id));
  };

  const updateTask = async (id, newText) => {
    await updateDoc(doc(db, 'tasks', id), { text: newText });
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '50px' }}>
      <h1>Tasks</h1>
      <div style={{ marginBottom: '20px' }}>
        <TextField
          label="New Task"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <Button variant="contained" onClick={addTask}>Add Task</Button>
      </div>
      <List>
        {tasks.docs.map((task) => (
          <ListItem key={task.id} style={{ display: 'flex', alignItems: 'center' }}>
            <TextField
              defaultValue={task.data().text}
              onBlur={(e) => updateTask(task.id, e.target.value)}
            />
            <IconButton onClick={() => deleteTask(task.id)} aria-label="delete">
              <DeleteIcon />
            </IconButton>
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default TaskList;
