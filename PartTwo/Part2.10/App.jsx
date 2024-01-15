import React from 'react'

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
  const [persons, setPersons] = React.useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])
  
  const [newName, setNewName] = React.useState('')
  const [newNumber, setNewNumber] = React.useState('')
  const [filter, setFilter] = React.useState('')

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