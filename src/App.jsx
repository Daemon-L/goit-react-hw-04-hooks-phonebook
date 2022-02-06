import { useState, useEffect } from "react";
import { nanoid } from 'nanoid';
import ContactForm from './components/ContactForm/ContactForm';
import ContactList from './components/ContactList/ConyactList';
import Filter from './components/ContactsFilter/Filter';
import { Container } from './App.styled';

const startingContacts = [
    { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
    { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
    { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
    { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
];
   
export default function App() {
    // const [contacts, setContacts] = useState(() => { return JSON.parse(localStorage.getItem('contacts')) ?? (startingContacts)})
    const [contacts, setContacts] = useState(startingContacts);
    // const [contacts, setContacts] = useState([]);
    const [filter, setFilter] = useState("");

    useEffect(() => {
        if (localStorage.getItem('contacts')) {
            const listOfContacts = JSON.parse(localStorage.getItem('contacts'));
            setContacts(listOfContacts);
        }
    }, []);

    useEffect(() => {
        localStorage.setItem("contacts", JSON.stringify(contacts));
    }, [contacts]);


    const formSubmitHandler = (name, number) => {
        const normalizedContact = name.toLowerCase();
        const newName = contacts.map(
            (item) => item.name.toLowerCase() === normalizedContact,
        );

        if (newName.includes(true)) {
            alert(`${name} is already in contacts`);
        } else {
            const contact = {
                id: nanoid(),
                name,
                number,
            };

            setContacts([contact, ...contacts]);
        }
        // console.log(contacts)
    };

    const deleteContact = (contactId) => {
        setContacts((contacts) => 
            contacts.filter((contact) => contact.id !== contactId)
        );
    };

    const changeFilter = (evt) => {
        setFilter(evt.currentTarget.value);
    };

    const getVisibleContacts = () => {
        
        const normalizedFilter = filter.toLowerCase();
        return contacts.filter(contact =>
            contact.name.toLowerCase().includes(normalizedFilter),
        );
    };
    
    return (
        <Container>
            <h1>Phonebook</h1>
            <ContactForm onSubmit={formSubmitHandler}/>

            <h2>Contacts</h2>
            <Filter value={filter} onChange={changeFilter}/>
            <ContactList
                contacts={getVisibleContacts}
                onDeleteContact={deleteContact}
            />
        </Container>
    );
}

// class App extends Component { 
//     state = {
//         contacts: [
//          {id: 'id-1', name: 'Rosie Simpson', number: '459-12-56'},
//          {id: 'id-2', name: 'Hermione Kline', number: '443-89-12'},
//          {id: 'id-3', name: 'Eden Clements', number: '645-17-79'},
//          {id: 'id-4', name: 'Annie Copeland', number: '227-91-26'},
//         ],
//         filter: '',
//     }
//     formSubmitHandler = data => {
//         const normalizedContact = data.name.toLowerCase();
//         const newName = this.state.contacts.map(
//             item => item.name.toLowerCase() === normalizedContact,
//         );
//         if (newName.includes(true)) {
//             alert(`${data.name} is already in contacts`);
//         } else {
//             const contact = {
//                 id: nanoid(),
//                 name: data.name,
//                 number: data.number,
//             }
//             this.setState(({ contacts }) => ({
//                 contacts: [contact, ...contacts],
//             }));
//         }
//     };
//     changeFilter = (evt) => {
//         this.setState({ filter: evt.currentTarget.value });
//     };
//     getVisibleContacts = () => {
//         const { filter } = this.state
//         const normalizedFilter = filter.toLowerCase();
//         return this.state.contacts.filter(contact =>
//             contact.name.toLowerCase().includes(normalizedFilter),
//         );
//     };
//     deleteContact = (contactId) => {
//         this.setState(({contacts}) => ({
//             contacts: contacts.filter(contact => contact.id !== contactId),
//         }));
//     };
//     componentDidMount() {
//         const contacts = localStorage.getItem('contacts');
//         const parsedContacts = JSON.parse(contacts);
//         if (parsedContacts) {
//             this.setState({ contacts: parsedContacts})
//         }
//     };
//     componentDidUpdate(prevProps, prevState) {
//         if (this.state.contacts !== prevState.contacts) {
//             // console.log('new state.contacts');
//             localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
//         }
//     };
//     render() { 
//         const { filter } = this.state
//         const visibleContacts = this.getVisibleContacts();
//         return (
//             <Container>
//                 <h1>Phonebook</h1>
//                 <ContactForm onSubmit={this.formSubmitHandler}/>
//                 <h2>Contacts</h2>
//                 <Filter value={filter} onChange={this.changeFilter}/>
//                 <ContactList contacts={visibleContacts} onDeleteContact = {this.deleteContact} />
//             </Container>
//         );
//     }
// }
// export default App;