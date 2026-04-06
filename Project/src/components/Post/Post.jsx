import './Post.css'

function Post({ post }) {
  return (
    <div className="post-card">
      <div className="post-header">
        <h3>{post.name}</h3>
        <p>{post.place}</p>
      </div>

      {post.image ? (
        <img src={post.image} alt={post.name} className="post-image" loading="lazy" />
      ) : (
        <div className="post-image"></div>
      )}

      {post.title && <p className="post-title">{post.title}</p>}
      <p className="post-user-name">@{post.username}</p>
      <p className="post-text">{post.text}</p>
    </div>
  )
}

export default Post
