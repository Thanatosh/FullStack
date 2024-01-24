import { useState, useEffect } from 'react'
import phonebook from './services/persons'

const Notification = ({ message }) => {
  if (message === null) {
    return null
  }

  return (
    <div className='notification'>
      {message}
    </div>
  )
}

const PersonForm = ({ newName, setNewName, newNumber, setNewNumber, addName }) => (
  <div>
    <div>
      Name: <input value={newName} onChange={(event) => setNewName(event.target.value)} />
    </div>
    <div>
      Number: <input value={newNumber} onChange={(event) => setNewNumber(event.target.value)} />
    </div>
    <div>
      <button type="submit" onClick={addName}>add</button>
    </div>
  </div>
)

const AddPerson = ({ persons, setPersons, newName, setNewName, newNumber, setNewNumber, setNotificationMessage }) => {
  const addName = (event) => {
    event.preventDefault()
    const existingName = persons.find(person => person.name === newName)

    if (existingName) {
      const updateConfirmed = window.confirm(
      `${newName} is already added to the phonebook, replace the old number with a new one?`
      )

      if (updateConfirmed) {
        phonebook
        .updateNumber(existingName.id, newNumber, existingName)
        .then(response => {
          setPersons(persons.map(person =>
            person.id === existingName.id ? response.data : person  
          ))
          setNewName('')
          setNewNumber('')
          setNotificationMessage(
            `'${response.data.name}' updated correctly`
          )
          setTimeout(() => {
            setNotificationMessage(null)
          }, 5000)
        })
        .catch(error => {
          setNotificationMessage(
            `Error => '${error}' while updating`
          )
          setTimeout(() => {
            setNotificationMessage(null)
          }, 5000)
        })
      }

    } else {
      const nameObject = {
        name: newName,
        number: newNumber
      }

      phonebook
        .createNew(nameObject)
        .then(response => {
          setPersons(persons.concat(response.data))
          setNewName('')
          setNewNumber('')
          setNotificationMessage(
            `'${newName}' added successfully`
          )
          setTimeout(() => {
            setNotificationMessage(null)
          }, 5000)
        })
        .catch(error => {
          setNotificationMessage(
            `Error => '${error}' while adding new person`
          )
          setTimeout(() => {
            setNotificationMessage(null)
          }, 5000)
        })
    }
  }

  return (
    <PersonForm
      newName={newName}
      setNewName={setNewName}
      newNumber={newNumber}
      setNewNumber={setNewNumber}
      addName={addName}
      setNotificationMessage={setNotificationMessage}
    />
  )
}

const Person = ({ person, removePerson }) => (
  <li className='person'>
    {person.name} {person.number}
    <button onClick={() => removePerson(person.id, person.name)}>Delete</button>
  </li>
)

const Filter = ({ filter, setFilter }) => (
  <div>
    Filter: <input value={filter} onChange={(event) => setFilter(event.target.value)} />
  </div>
)

const Persons = ({ persons, filter, removePerson }) => {
  const filteredNames = filter
    ? persons.filter((person) => person.name.toLowerCase().includes(filter.toLowerCase()))
    : persons

  return (
    <ul>
      {filteredNames.map((person) => (
        <Person key={person.id} person={person} removePerson={removePerson} />
      ))}
    </ul>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [notificationMessage, setNotificationMessage] = useState(null)

  useEffect(() => {
    phonebook
      .getAll()
      .then(response => {
        setPersons(response.data)
      })
  }, [])

  const deletePerson = (id, name) => {
    if (window.confirm(`Delete ${name}?`)) {
      phonebook
        .removePerson(id)
        .then(() => {
          setPersons(persons.filter(person => person.id !== id))
          setNotificationMessage(
            `'${name}' deleted successfully`
          )
          setTimeout(() => {
            setNotificationMessage(null)
          }, 5000)
        })
        .catch(error => {
          setNotificationMessage(
            `Error => '${error}' while deleting person`
          )
          setTimeout(() => {
            setNotificationMessage(null)
          }, 5000)
        })
    }
  }

  return (
    <div>
      <Notification message={notificationMessage} />
      <h2>Phonebook</h2>
      <Filter filter={filter} setFilter={setFilter} />
      <h2>Add new person</h2>
      <AddPerson
        persons={persons}
        setPersons={setPersons}
        newName={newName}
        setNewName={setNewName}
        newNumber={newNumber}
        setNewNumber={setNewNumber}
        setNotificationMessage={setNotificationMessage}
      />
      <h2>Numbers</h2>
      <Persons persons={persons} filter={filter} removePerson={deletePerson} />
    </div>
  )
}

export default App