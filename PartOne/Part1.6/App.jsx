import { useState } from 'react'

const Display = ({ value, text }) => (
  <div>
    {text}
    {value}
  </div>
)

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h2>Give Feedback</h2>
      <Button handleClick={() => setGood(good + 1)} text="Good" />
      <Button handleClick={() => setNeutral(neutral + 1)} text="Neutral" />
      <Button handleClick={() => setBad(bad + 1)} text="Bad" />
      <h2>Statistics</h2>
      <div>
        <Display value={good} text="Good "/>
        <Display value={neutral} text="Neutral "/>
        <Display value={bad} text="Bad "/>
      </div>
    </div>
  )
}

export default App