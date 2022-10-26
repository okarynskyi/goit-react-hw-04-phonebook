import { useState } from "react";
import { nanoid } from 'nanoid';
import PropTypes from 'prop-types';
import css from './ContactForm.module.css';

export const ContactForm = ({addContact}) => {
  const [name, setName] = useState('')
  const [number, setNumber] = useState('')
    
  const nameId = nanoid();
  const numberId = nanoid();

  const handleChange = (e) => {
    const {name} = e.currentTarget;

    switch (name) {
      case 'name':
        setName(e.currentTarget.value);
        break;
      case 'number':
        setNumber(e.currentTarget.value);
        break;
      default:
        break;
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    addContact({name, number})
    setName('');
    setNumber('');
  }

  return (
    <form onSubmit={handleSubmit} className={css.form}>
      <div className={css.input}>
        <label htmlFor={nameId} className={css.input_label}>Name</label>
        <input
          type="text"
          id={nameId}
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          value={name}
          onChange={handleChange}
          required
          className={css.input_text}
        />
      </div>
      <div className={css.input}>
        <label htmlFor={numberId} className={css.input_label}>Number</label>
        <input
          type="tel"
          id={numberId}
          name="number"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          value={number}
          onChange={handleChange}
          required
          className={css.input_text}
        />
      </div>
      <button type="submit" className={css.input_button}>Add contact</button>
    </form>
  )
}

ContactForm.propTypes = {
  addContact: PropTypes.func.isRequired,
};