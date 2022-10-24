import { Component } from "react";
import { nanoid } from 'nanoid';
import { ContactForm } from './ContactForm/ContactForm';
import { ContactList } from './ContactList/ContactList';
import { Filter } from './Filter/Filter';
import css from './App.module.css';

export class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: ''
  }

  componentDidMount() {
    const parcedContacts = JSON.parse(localStorage.getItem('contacts'));
    if (parcedContacts) {
      this.setState({ contacts: parcedContacts });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { contacts } = this.state;
    if (prevState.contacts !== contacts) {
      localStorage.setItem('contacts', JSON.stringify(contacts));
    }
  }

  addContact = (contact) => {
    if (this.isDuplicate(contact)) {
      return alert(`${contact.name} is already in contacts`);
    }
      
    this.setState((prev) => {
      const newContact = {
        id: nanoid(),
        ...contact
      }
      return {
        contacts: [...prev.contacts, newContact]
      }
    })
  }

  isDuplicate = ({ name }) => {
    const { contacts } = this.state;
    const result = contacts.find((item) => item.name.toLowerCase() === name.toLowerCase());
    return result;
  }

  removeContact = (id) => {
    this.setState((prev) => {
      const newContacts = prev.contacts.filter((item) => item.id !== id)
      return {
        contacts: newContacts
      }
    })
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({
            [name]: value,
        })
  }

  getFilteredContacts = () => {
    const { contacts, filter } = this.state
    
    if (!filter) { return contacts }
    
    const normalizedFilter = filter.toLocaleLowerCase();
    const filteredContacts = contacts.filter(({ name, number }) => {
      const normalizedName = name.toLocaleLowerCase();
      const normalizedNumber = number.toLocaleLowerCase();
      const result = normalizedName.includes(normalizedFilter) || normalizedNumber.includes(normalizedFilter);
      return result
    })
    return filteredContacts
  }

  render() {
    const { addContact, removeContact, handleChange } = this;
    const { filter } = this.state;
    const contacts = this.getFilteredContacts();

    return (
      <>
        <div className={css.container}>
          <h1>Phonebook</h1>
          <ContactForm addContact={addContact} />
          <h2>Contacts</h2>
          <Filter filter={filter} handleChange={handleChange} />
          <ContactList contacts={contacts} removeContact={removeContact} />
        </div>        
      </>
    )
  }
};
