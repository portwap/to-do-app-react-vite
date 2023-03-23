import { useEffect, useState } from 'react';
import List from './List';
import Alert from './Alert';
import { nanoid } from 'nanoid/non-secure'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './index.css';

const getLocalStorage = () => {
  let list = localStorage.getItem('list');
  if (list) {
    return JSON.parse(list);
  } else {
    return []
  }
}

function App() {
  const [name, setName] = useState('');
  const [list, setList] = useState(getLocalStorage());
  const [isEditing, setIsEditing] = useState(false);
  const [editID, setEditID] = useState(null);
  const [alert, setAlert] = useState({ show: false, msg: '', type: '' });

  useEffect(() => {
    localStorage.setItem('list', JSON.stringify(list));
  }, [list]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name) {
      showAlert(true, 'danger', 'please enter value');
    } else if (name && isEditing) {
      setList(
        list.map((item) => {
          if (item.id === editID) {
            if (item.title !== name) {
              setName('');
              setEditID(null);
              setIsEditing(false);
              showAlert(true, 'success', 'value changed');
              return { ...item, title: name };
            }
            if (item.title === name) {
              setName('');
              setEditID(null);
              setIsEditing(false);
              showAlert(true, 'danger', 'you left the same value');
              return item;
            }
          }
          return item;
        })
      );
    } else {
      showAlert(true, 'success', 'item added to the list');
      const newItem = {
        id: nanoid(10),
        title: name,
        strikethrough: false,
      };
      setList([...list, newItem]);
      setName('');
    }
  };

  const clearList = () => {
    showAlert(true, 'danger', 'list cleared');
    setList([]);
  };

  const showAlert = (show = false, type = '', msg = '') => {
    setAlert({ show, type, msg });
  };

  const removeItem = (id) => {
    showAlert(true, 'danger', 'item removed');
    setList(list.filter((item) => item.id !== id));
  };

  const editItem = (id) => {
    const specificItem = list.find((item) => item.id === id);
    setIsEditing(true);
    setEditID(id);
    setName(specificItem.title);
  };

  const strikeText = (id, strikethrough) => {
    showAlert(
      true,
      'danger',
      `${strikethrough ? 'strikethrough removed' : 'text is crossed out'}`
    );
    setList(
      list.map((item) => {
        return item.id === id
          ? { ...item, strikethrough: !item.strikethrough }
          : { ...item };
      })
    );
  };

  return (
    <section className='section-center'>
      <form className='grocery-form' onSubmit={handleSubmit}>
        {alert.show && <Alert removeAlert={showAlert} alert={alert} />}
        <h3>to do list</h3>
        <div className='form-control'>
          <input
            type='text'
            className='grocery'
            placeholder='e.g. buy eggs'
            value={name}
            maxlength="35"
            onChange={(e) => setName(e.target.value)}
          />
          <button type='submit' className='submit-btn'>
            {isEditing ? 'edit' : 'submit'}
          </button>
        </div>
      </form>
      {list.length > 0 && (
        <div className='grocery-container'>
          <List
            items={list}
            removeItem={removeItem}
            editItem={editItem}
            strikeText={strikeText}
          />
          <button className='clear-btn' onClick={clearList}>
            clear all items
          </button>
        </div>
      )}
    </section>
  );
}

export default App;
