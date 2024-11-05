import React from 'react';

const TaskList = ({ tasks, onDeleteTask }) => {
    return (
        <div>
            {tasks.length === 0 ? (
                <p>No hay tareas pendientes</p>
            ) : (
                tasks.map((task) => (
                    <React.Fragment key={task.id}>
                        <div>
                            <h3>{task.name}</h3>
                            <p>Fecha límite: {task.deadline}</p>
                            <p>Prioridad sugerida: {task.priority}</p>
                            <button onClick={() => onDeleteTask(task.id)}>Eliminar</button>
                        </div>
                        <hr />
                    </React.Fragment>
                ))
            )}
        </div>
    );
};

export default TaskList;
