import { useState, useEffect } from "react";
import { nanoid } from 'nanoid';
import { ContactForm } from './ContactForm/ContactForm';
import { ContactList } from './ContactList/ContactList';
import { Filter } from './Filter/Filter';
import css from './App.module.css';

export const App = () => {
  const [contacts, setContacts] = useState(() => {
    return (JSON.parse(localStorage.getItem('contacts')) || [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ])
  });
  const [filter, setFilter] = useState('');

  // useEffect(() => {
  //   const parcedContacts = JSON.parse(localStorage.getItem('contacts'));
  //   if (parcedContacts) {
  //     setContacts(parcedContacts)
  //   }
  // }, []);

  useEffect(() => localStorage.setItem('contacts', JSON.stringify(contacts)), [contacts])

  const addContact = (contact) => {
    if (isDuplicate(contact)) {
      return alert(`${contact.name} is already in contacts`);
    }
      
    setContacts((prev) => {
      const newContact = {
        id: nanoid(),
        ...contact
      }
      return [...prev, newContact]
    })
  }

  const isDuplicate = ({ name }) => {
    const result = contacts.find((item) => item.name.toLowerCase() === name.toLowerCase());
    return result;
  }

  const removeContact = (id) => {
    setContacts((prev) => {
      const newContacts = prev.filter((item) => item.id !== id)
      return newContacts
    })
  }

  const handleChange = (e) => {
    setFilter(e.currentTarget.value)
  }

  const getFilteredContacts = () => {
    if (!filter) { return contacts }
    
    const normalizedFilter = filter.toLowerCase();
    const filteredContacts = contacts.filter(({ name, number }) => {
      const normalizedName = name.toLowerCase();
      const normalizedNumber = number.toLowerCase();
      const result = normalizedName.includes(normalizedFilter) || normalizedNumber.includes(normalizedFilter);
      return result
    })

    return filteredContacts
  }

  return (
    <>
      <div className={css.container}>
        <h1>Phonebook</h1>
        <ContactForm addContact={addContact} />
        <h2>Contacts</h2>
        <Filter filter={filter} handleChange={handleChange} />
        <ContactList contacts={getFilteredContacts()} removeContact={removeContact} />
      </div>        
    </>
  )
};
