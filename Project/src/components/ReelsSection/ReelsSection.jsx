import { useEffect, useRef, useState } from 'react'
import './ReelsSection.css'

function ReelsSection() {
  const [reels, setReels] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [currentIndex, setCurrentIndex] = useState(0)
  const lastScrollTime = useRef(0)

  useEffect(() => {
    async function getReels() {
      try {
        const [usersResponse, postsResponse] = await Promise.all([
          fetch('https://dummyjson.com/users?limit=10'),
          fetch('https://dummyjson.com/posts?limit=12'),
        ])

        if (!usersResponse.ok || !postsResponse.ok) {
          throw new Error('Failed to load reels')
        }

        const usersResult = await usersResponse.json()
        const postsResult = await postsResponse.json()
        const usersData = usersResult.users
        const postsData = postsResult.posts

        const reelData = postsData.slice(0, 4).map((post, index) => {
          const user =
            usersData.find((item) => item.id === post.userId) ||
            usersData[index % usersData.length]

          return {
            id: post.id,
            title: post.title,
            text: post.body,
            username: user ? user.username : 'unknown_user',
            image: `https://picsum.photos/seed/reel-${post.id}/600/700`,
          }
        })

        setReels(reelData)
      } catch (fetchError) {
        setError('Unable to load reels')
      } finally {
        setLoading(false)
      }
    }

    getReels()
  }, [])

  function handleWheel(event) {
    if (reels.length === 0) {
      return
    }

    const now = Date.now()

    if (now - lastScrollTime.current < 600) {
      return
    }

    lastScrollTime.current = now

    if (event.deltaY > 0) {
      setCurrentIndex((current) => {
        if (current === reels.length - 1) {
          return 0
        }

        return current + 1
      })
      return
    }

    if (event.deltaY < 0) {
      setCurrentIndex((current) => {
        if (current === 0) {
          return reels.length - 1
        }

        return current - 1
      })
    }
  }

  const currentReel = reels[currentIndex]

  return (
    <div className="section-box">
      <h2>Reels</h2>
      {loading && <p>Loading reels...</p>}
      {error && <p className="error-text">{error}</p>}
      {!loading && !error && currentReel && (
        <div className="reel-box" onWheel={handleWheel}>
          <img
            src={currentReel.image}
            alt={currentReel.title}
            className="reel-image"
            loading="lazy"
          />
          <p className="reel-user-name">@{currentReel.username}</p>
          <p className="reel-title">{currentReel.title}</p>
          <p className="reel-text">{currentReel.text}</p>
          <p className="reel-hint">Scroll up or down to view the next reel.</p>
        </div>
      )}
    </div>
  )
}

export default ReelsSection
