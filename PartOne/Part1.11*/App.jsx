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

  return (
    <div>
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