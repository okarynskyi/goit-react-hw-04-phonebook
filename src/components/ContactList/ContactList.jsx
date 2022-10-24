import PropTypes from 'prop-types';
import css from './ContactList.module.css';

export const ContactList = ({ contacts, removeContact }) => {
    const elements = contacts.map(({ name, number, id }) => {
        return <li key={id} className={css.list}>{name}: {number}
            <button onClick={() => {removeContact(id)}} className={css.list_button}>Delete</button>
        </li>
    })
    return (
        <ul>{elements}</ul>
    )
}

ContactList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.exact({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ).isRequired,
  removeContact: PropTypes.func.isRequired,
};