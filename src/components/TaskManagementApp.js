import React, { useState, useEffect } from 'react';
import TaskForm from './TaskForm';
import TaskList from './TaskList';
import { db } from '../firebaseConfig';
import { collection, addDoc, getDocs } from 'firebase/firestore';
import { getFunctions, httpsCallable } from 'firebase/functions';

const TaskManagementApp = () => {
    const [tasks, setTasks] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const functions = getFunctions();

    // Función para agregar una tarea a Firestore
    const addTask = async (task) => {
        try {
            const docRef = await addDoc(collection(db, 'tasks'), task);
            console.log('Tarea agregada con ID: ', docRef.id);

            setTasks([...tasks, { ...task, id: docRef.id }]);
            setShowForm(false);
        } catch (e) {
            console.error('Error agregando la tarea: ', e);
        }
    };

    // Función para obtener las tareas de Firestore al cargar la página
    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, 'tasks'));
                const taskList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setTasks(taskList);
            } catch (error) {
                console.error('Error obteniendo las tareas:', error);
            }
        };

        fetchTasks();
    }, []);

    // Función para eliminar una tarea utilizando Firebase Function
    const deleteTask = async (taskId) => {
        try {
            const deleteTaskFunction = httpsCallable(functions, 'deleteTask');
            await deleteTaskFunction({ taskId });

            // Actualiza el estado local de las tareas después de eliminarla de Firestore
            setTasks(tasks.filter(task => task.id !== taskId));
        } catch (e) {
            console.error('Error eliminando la tarea: ', e);
        }
    };

    return (
        <div>
            <h1>Gestión de Tareas</h1>
            <button onClick={() => setShowForm(!showForm)}>
                {showForm ? 'Cancelar' : 'Agregar Tarea'}
            </button>
            {showForm && <TaskForm onAddTask={addTask} />}
            <TaskList tasks={tasks} onDeleteTask={deleteTask} />
        </div>
    );
};

export default TaskManagementApp;
