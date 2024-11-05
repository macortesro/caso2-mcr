import React, { useState } from 'react';
import SimpleReactValidator from 'simple-react-validator';
import axios from 'axios';
import moment from 'moment';

window.moment = moment;

const TaskForm = ({ onAddTask }) => {
    const [name, setName] = useState('');
    const [deadline, setDeadline] = useState('');
    const [validator] = useState(new SimpleReactValidator());

    const handleSubmit = async (e) => {
        e.preventDefault();

        const deadlineMoment = moment(deadline, 'YYYY-MM-DD', true);

        if (validator.allValid()) {
            try {
                const response = await axios.get('https://jsonplaceholder.typicode.com/todos/1');
                const additionalData = response.data;

                onAddTask({
                    name,
                    deadline: deadlineMoment.format('YYYY-MM-DD'),
                    priority: additionalData.title,
                });

                setName('');
                setDeadline('');
                validator.hideMessages();
            } catch (error) {
                console.error('Error al obtener datos adicionales:', error);
            }
        } else {
            validator.showMessages();
            setName(name);
            setDeadline(deadline);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Nombre de la tarea:</label>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    onBlur={() => validator.showMessageFor('name')}
                />
                {validator.message('name', name, 'required', { className: 'text-danger' })}
            </div>

            <div>
                <label>Fecha límite:</label>
                <input
                    type="date"
                    value={deadline}
                    onChange={(e) => setDeadline(e.target.value)}
                    onBlur={() => validator.showMessageFor('deadline')}
                />
                {validator.message('deadline', moment(deadline, 'YYYY-MM-DD', true), 'required|date', { className: 'text-danger' })}
            </div>

            <button type="submit">Agregar Tarea</button>
        </form>
    );
};

export default TaskForm;
