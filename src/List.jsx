import { FaEdit, FaTrash, FaStrikethrough } from 'react-icons/fa';

const List = ({ items, removeItem, editItem, strikeText }) => {
  return (
    <div className='grocery-list'>
      {items.map((item) => {
        const { id, title, strikethrough } = item;
        return (
          <article key={id} className='grocery-item'>
            <p className={`title ${strikethrough && 'strikethrough-text'}`}>
              {title}
            </p>
            <div className='btn-container'>
              <button
                type='button'
                className='edit-btn'
                onClick={() => editItem(id)}
              >
                <FaEdit />
              </button>
              <button
                type='button'
                className='strikethrough-btn'
                onClick={() => strikeText(id, strikethrough)}
              >
                <FaStrikethrough />
              </button>
              <button
                type='button'
                className='delete-btn'
                onClick={() => removeItem(id)}
              >
                <FaTrash />
              </button>
            </div>
          </article>
        );
      })}
    </div>
  );
};

export default List;
