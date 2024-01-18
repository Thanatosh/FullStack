import { useState, useEffect } from 'react'
import axios from 'axios'

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

const AddPerson = ({ persons, setPersons, newName, setNewName, newNumber, setNewNumber }) => {
  const addName = (event) => {
    event.preventDefault()
    const existingName = persons.find(person => person.name === newName)

    if (existingName) {
      alert(`${newName} is already added to the phonebook`)
    } else {
      const nameObject = {
        id: String(persons.length + 1),
        name: newName,
        number: newNumber
      }

      setPersons(persons.concat(nameObject))
      setNewName('')
      setNewNumber('')
    }
  }

  return (
    <PersonForm
      newName={newName}
      setNewName={setNewName}
      newNumber={newNumber}
      setNewNumber={setNewNumber}
      addName={addName}
    />
  )
}

const Filter = ({ filter, setFilter }) => (
  <div>
    Filter: <input value={filter} onChange={(event) => setFilter(event.target.value)} />
  </div>
)

const Persons = ({ persons, filter }) => {
  const filteredNames = filter
    ? persons.filter((person) => person.name.toLowerCase().includes(filter.toLowerCase()))
    : persons

  return (
    <ul>
      {filteredNames.map((person) => (
        <li key={person.name}>{person.name} {person.number}</li>
      ))}
    </ul>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
      })
  }, [])

  return (
    <div>
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
      />
      <h2>Numbers</h2>
      <Persons persons={persons} filter={filter} />
    </div>
  )
}

export default App