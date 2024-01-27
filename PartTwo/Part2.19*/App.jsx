import { useEffect, useState } from 'react'
import countriesService from './services/countries'

const Search = ({ search, setSearch }) => (
  <div>
    Search: <input value={search} onChange={(event) => setSearch(event.target.value)} />
  </div>
)

const Country = ({ country }) => (
    <div>
      <h2>{country.name.common}</h2>
      <div>
        Capital: {country.capital}
      </div>
      <div>
        Area: {country.area}
      </div>
      <h3>Languages:</h3>
      <ul>
        {Object.entries(country.languages).map(([languageCode, languageName]) => (
          <li key={languageCode}>{languageName}</li>
        ))}
      </ul>
      <div>
        <h3>Flag:</h3>
          <img src={country.flags.png}
          alt={`Flag of ${country.name.common}`}
          style={{ border: '1px solid #000000' }}
        />
      </div>
    </div>
)

const SearchResults = ({ countries, search }) => {
  const [selectedCountry, setSelectedCountry] = useState(null)

  useEffect(() => {
    setSelectedCountry(null)
  }, [search])

  const searchedCountries = search
    ? countries.filter((country) => country.name.common.toLowerCase().includes(search.toLowerCase()))
    : []

  if (searchedCountries.length > 10) {
    return ('Too many matches, provide stricter filter')
  }

  if (selectedCountry) {
    return (
      <Country key={selectedCountry.cca3} country={selectedCountry} />
    )
  }

  if (searchedCountries.length === 1) {
    return (
      <Country key={searchedCountries[0].cca3} country={searchedCountries[0]} />
    )
  }

  return (
    <ul>
      {searchedCountries.map((country) => (
        <li key={country.cca3}>
          {country.name.common}
          <button onClick={() => setSelectedCountry(country)}>Show</button>
        </li>
      ))}
    </ul>
  )
}

function App() {
  const [countries, setCountries] = useState([])
  const [search, setSearch] = useState('')

  useEffect(() => {
    countriesService
      .getAll()
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  return (
    <div>
      <h2>Search countries</h2>
      <Search search={search} setSearch={setSearch}/>
      <h2>Search results:</h2>
      <SearchResults countries={countries} search={search}/>
    </div>
  )
}

export default App