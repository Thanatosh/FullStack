import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])
  
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  const addName = (event) => {
    event.preventDefault()
    const existingName = persons.find(person => person.name === newName)

    if (existingName) {
      alert(`${newName} is already added to phonebook`)
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

  const filteredNames = filter
    ? persons.filter((person) => person.name.toLowerCase().includes(filter.toLowerCase()))
    : persons


  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        Filter: <input value={filter} onChange={(event) => setFilter(event.target.value)} />
      </div>
      <form>
        <h2>Add new person</h2>
        <div>
          Name: <input value={newName} onChange={(event) => setNewName(event.target.value)} />
        </div>
        <div>
          Number: <input value={newNumber} onChange={(event) => setNewNumber(event.target.value)} />
        </div>
        <div>
          <button type="submit" onClick={addName}>add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {filteredNames.map((person) => (
          <li key={person.name}>{person.name} {person.number}</li>
        ))}
      </ul>
    </div>
  )
}

export default App