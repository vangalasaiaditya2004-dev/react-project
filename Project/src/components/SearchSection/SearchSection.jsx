import { useEffect, useState } from 'react'
import './SearchSection.css'

function SearchSection() {
  const [searchText, setSearchText] = useState('')
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    async function getUsers() {
      try {
        const response = await fetch('https://dummyjson.com/users?limit=10')

        if (!response.ok) {
          throw new Error('Failed to load users')
        }

        const data = await response.json()
        setUsers(data.users)
      } catch (fetchError) {
        setError('Unable to load users')
      } finally {
        setLoading(false)
      }
    }

    getUsers()
  }, [])

  const filteredUsers = users.filter((user) => {
    const fullName = `${user.firstName} ${user.lastName}`.toLowerCase()
    const username = user.username.toLowerCase()
    const query = searchText.toLowerCase()

    return fullName.includes(query) || username.includes(query)
  })

  return (
    <div className="section-box">
      <h2>Search</h2>
      <input
        type="text"
        placeholder="Search here"
        className="simple-input"
        value={searchText}
        onChange={(event) => setSearchText(event.target.value)}
      />
      {loading && <p className="section-text">Loading users...</p>}
      {error && <p className="section-text error-text">{error}</p>}
      {!loading &&
        !error &&
        filteredUsers.map((user) => (
          <div key={user.id} className="user-card">
            <div className="user-top">
              {user.image ? (
                <img src={user.image} alt={user.username} className="user-image" />
              ) : (
                <div className="user-initials">
                  {user.firstName.charAt(0)}
                  {user.lastName.charAt(0)}
                </div>
              )}
              <div>
                <p className="user-name">
                  {user.firstName} {user.lastName}
                </p>
                <p className="user-detail">@{user.username}</p>
              </div>
            </div>
            <p className="user-detail">{user.email}</p>
          </div>
        ))}
    </div>
  )
}

export default SearchSection
