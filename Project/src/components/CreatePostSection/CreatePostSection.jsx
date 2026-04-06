import { useState } from 'react'
import './CreatePostSection.css'

function CreatePostSection({ savedData, handleAddPost }) {
  const [title, setTitle] = useState('')
  const [caption, setCaption] = useState('')
  const [image, setImage] = useState('')

  function handleImageChange(event) {
    const file = event.target.files[0]

    if (!file) {
      return
    }

    const reader = new FileReader()

    reader.onloadend = () => {
      setImage(reader.result)
    }

    reader.readAsDataURL(file)
  }

  function handleSubmit(event) {
    event.preventDefault()

    const newPost = {
      id: Date.now(),
      name: savedData?.fullName || 'My Profile',
      username: savedData?.username || 'my_profile',
      place: 'My Profile',
      title: title,
      text: `${title} ${caption}`.trim(),
      image,
    }

    handleAddPost(newPost)
    setTitle('')
    setCaption('')
    setImage('')
  }

  return (
    <div className="section-box">
      <h2>Create Post</h2>
      <form className="create-form" onSubmit={handleSubmit}>
        <label>Post Title</label>
        <input
          type="text"
          className="simple-input"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        />
        <label>Post Caption</label>
        <textarea
          className="simple-textarea"
          value={caption}
          onChange={(event) => setCaption(event.target.value)}
        ></textarea>
        <label>Choose Image</label>
        <input type="file" accept="image/*" onChange={handleImageChange} />
        {image && <img src={image} alt="Preview" className="preview-image" />}
        <button type="submit">Post</button>
      </form>
    </div>
  )
}

export default CreatePostSection
