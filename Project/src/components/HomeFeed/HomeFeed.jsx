import { useEffect, useState } from 'react'
import Post from '../Post/Post'
import './HomeFeed.css'

function HomeFeed({ savedData, myPosts }) {
  const [stories, setStories] = useState([])
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    async function getHomeData() {
      try {
        const [usersResponse, postsResponse] = await Promise.all([
          fetch('https://dummyjson.com/users?limit=10'),
          fetch('https://dummyjson.com/posts?limit=8'),
        ])

        if (!usersResponse.ok || !postsResponse.ok) {
          throw new Error('Failed to load home data')
        }

        const usersResult = await usersResponse.json()
        const postsResult = await postsResponse.json()
        const usersData = usersResult.users
        const postsData = postsResult.posts

        const storyData = [
          {
            id: 'me',
            name: savedData?.username || savedData?.fullName || 'You',
            image: '',
          },
          ...usersData.slice(0, 5).map((user) => ({
            id: user.id,
            name: user.username,
            image: user.image || '',
          })),
        ]

        const postData = postsData.map((post, index) => {
          const user =
            usersData.find((item) => item.id === post.userId) ||
            usersData[index % usersData.length]

          return {
            id: post.id,
            name: user ? `${user.firstName} ${user.lastName}` : 'Unknown User',
            username: user ? user.username : 'unknown_user',
            place: user ? `${user.address.city}, ${user.address.state}` : 'Unknown Place',
            text: post.body,
            title: post.title,
            image: `https://picsum.photos/seed/post-${post.id}/600/400`,
          }
        })

        setStories(storyData)
        setPosts(postData)
      } catch (fetchError) {
        setError('Unable to load posts')
      } finally {
        setLoading(false)
      }
    }

    getHomeData()
  }, [savedData?.fullName, savedData?.username])

  return (
    <>
      <div className="stories-box">
        <div className="stories-list">
          {stories.map((story) => (
            <div key={story.id} className="story-item">
              {story.image ? (
                <img src={story.image} alt={story.name} className="story-image" />
              ) : (
                <div className="story-circle">{story.name.charAt(0)}</div>
              )}
              <p>{story.name}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="posts-box">
        {loading && <p>Loading posts...</p>}

        {error && <p className="error-text">{error}</p>}

        {!loading &&
          !error &&
          [...myPosts, ...posts].map((post) => <Post key={post.id} post={post} />)}
      </div>
    </>
  )
}

export default HomeFeed
