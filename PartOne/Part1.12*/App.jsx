import { useState } from 'react'

const StatisticLine = ({ value, text }) => (
  <tr>
    <td>{text}</td>
    <td>{value}</td>
  </tr>
)

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const Statistics = ({ good, neutral, bad}) => {
  const total = good + neutral + bad
  const average = total === 0 ? 0 : (good - bad) / total
  const percentage = total === 0 ? 0 : (good / total) * 100

  if (total === 0) {
    return (
      <div>
        <h2>Statistics</h2>
        <p>No feedback given</p>
      </div>
    )
  } else {
    return (
      <div>
        <h2>Statistics</h2>
        <table>
          <tbody>
            <StatisticLine value={good} text="Good: "/>
            <StatisticLine value={neutral} text="Neutral: "/>
            <StatisticLine value={bad} text="Bad: "/>
            <StatisticLine value={total} text="Total: "/>
            <StatisticLine value={average} text="Average: "/>
            <StatisticLine value={`${percentage} %`} text="Positive: "/>
          </tbody>
        </table>
      </div>
    )
  }
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.',
    'The only way to go fast, is to go well.',
    'A primary cause of complexity is that software vendors uncritically adopt almost any feature that users want.',
    'Its better to wait for a productive programmer to become available than it is to wait for the first available programmer to become productive.'
  ]
   
  const [selected, setSelected] = useState(0)

  return (
    <div>
      <div>
        {anecdotes[selected]}
      </div>
      <div>
        <Button handleClick={() => setSelected(Math.floor(Math.random() * anecdotes.length))} text="Random anecdote" />
      </div>
      <h2>Give Feedback</h2>
      <div>
        <Button handleClick={() => setGood(good + 1)} text="Good" />
        <Button handleClick={() => setNeutral(neutral + 1)} text="Neutral" />
        <Button handleClick={() => setBad(bad + 1)} text="Bad" />
      </div>
      <div>
        <Statistics  good={good} neutral={neutral} bad={bad} />
      </div>
    </div>
  )
}

export default App