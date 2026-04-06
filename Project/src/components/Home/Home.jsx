import { lazy, Suspense, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import BottomNavbar from '../BottomNavbar/BottomNavbar'
import CreatePostSection from '../CreatePostSection/CreatePostSection'
import HomeFeed from '../HomeFeed/HomeFeed'
import ProfileSection from '../ProfileSection/ProfileSection'
import SearchSection from '../SearchSection/SearchSection'
import './Home.css'

const ReelsSection = lazy(() => import('../ReelsSection/ReelsSection'))

function Home() {
  const navigate = useNavigate()
  const savedData = JSON.parse(localStorage.getItem('signupData'))
  const [activeTab, setActiveTab] = useState('home')
  const [myPosts, setMyPosts] = useState(() => {
    const savedPosts = localStorage.getItem('myPosts')

    if (savedPosts) {
      return JSON.parse(savedPosts)
    }

    return []
  })

  useEffect(() => {
    localStorage.setItem('myPosts', JSON.stringify(myPosts))
  }, [myPosts])

  function handleLogout() {
    localStorage.removeItem('isLoggedIn')
    navigate('/login')
  }

  function handleAddPost(newPost) {
    setMyPosts((currentPosts) => [newPost, ...currentPosts])
    setActiveTab('profile')
  }

  function renderContent() {
    if (activeTab === 'search') {
      return <SearchSection />
    }

    if (activeTab === 'reels') {
      return (
        <Suspense fallback={<div className="section-box">Loading reels...</div>}>
          <ReelsSection />
        </Suspense>
      )
    }

    if (activeTab === 'create') {
      return <CreatePostSection savedData={savedData} handleAddPost={handleAddPost} />
    }

    if (activeTab === 'profile') {
      return (
        <ProfileSection
          savedData={savedData}
          handleLogout={handleLogout}
          myPosts={myPosts}
        />
      )
    }

    return (
      <HomeFeed
        savedData={savedData}
        myPosts={myPosts}
      />
    )
  }

  return (
    <section className="home-page">
      <div className="home-container">{renderContent()}</div>
      <BottomNavbar activeTab={activeTab} setActiveTab={setActiveTab} />
    </section>
  )
}

export default Home
