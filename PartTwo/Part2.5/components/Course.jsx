const Header = (props) => {
  return (
    <div>
      <h2>{props.course}</h2>
    </div>
  )
}

const Part = (props) => {
  return (
    <p>
      {props.part.name} {props.part.exercises}
    </p>
  )
}

const Total = (props) => {
  const totalExercises = props.parts.reduce((sum, part) => sum + part.exercises, 0)
  return (
    <div>
      <b>Total of {totalExercises} exercises</b>
    </div>
  )
}

const Content = (props) => {
  return (
    <div>
      {props.parts.map((part) => (
        <Part key={part.id} part={part} />
      ))}
    </div>
  )
}

const Course = ({ course }) => {
  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

export default Course