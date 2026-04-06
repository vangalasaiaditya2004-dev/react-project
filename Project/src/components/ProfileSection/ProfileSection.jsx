import Post from '../Post/Post'
import './ProfileSection.css'

function ProfileSection({ savedData, handleLogout, myPosts }) {
  return (
    <div className="section-box">
      <h2>My Profile</h2>
      <p className="section-text">Name: {savedData?.fullName}</p>
      <p className="section-text">Username: {savedData?.username}</p>
      <p className="section-text">Email or Phone: {savedData?.emailOrPhone}</p>
      <div className="profile-status-box">
        <p className="section-text">My Status</p>
        <div className="profile-story">
          <div className="profile-story-circle">
            {(savedData?.username || savedData?.fullName || 'Y').slice(0, 2).toUpperCase()}
          </div>
          <div>
            <p>{savedData?.fullName || 'My Profile'}</p>
            <p className="section-text">@{savedData?.username || 'user'}</p>
          </div>
        </div>
      </div>
      <div className="profile-posts">
        <p className="section-text">My Posts</p>
        {myPosts.length === 0 && <p className="section-text">No posts added yet.</p>}
        {myPosts.map((post) => (
          <Post key={post.id} post={post} />
        ))}
      </div>
      <button type="button" className="logout-button" onClick={handleLogout}>
        Logout
      </button>
    </div>
  )
}

export default ProfileSection
