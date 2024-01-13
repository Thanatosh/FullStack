import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ])
  
  const [newName, setNewName] = useState('')

  const addName = (event) => {
    event.preventDefault()
    const existingName = persons.find(person => person.name === newName)

    if (existingName) {
      alert(`${newName} is already added to phonebook`)
    } else {
      const nameObject = {
        name: newName
      }

      setPersons(persons.concat(nameObject))
      setNewName('')
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form>
        <div>
          Name: <input value={newName} onChange={(event) => setNewName(event.target.value)} />
        </div>
        <div>
          <button type="submit" onClick={addName}>add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {persons.map((person) => (
          <li key={person.name}>{person.name}</li>
        ))}
      </ul>
    </div>
  )
}

export default App