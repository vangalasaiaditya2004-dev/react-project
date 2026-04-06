# Instagram Clone


This is a beginner-friendly Instagram clone frontend built with React and Vite.

The project includes:
- signup page
- login page
- forgot password page
- protected home page
- bottom navbar with icons
- home feed with fake API data
- search section
- reels section with lazy loading
- create post section
- profile section

## Tech Used

- React
- Vite
- React Router DOM
- CSS
- localStorage

## Features

### Authentication

- user signup data is stored in `localStorage`
- login checks the saved signup data
- `ProtectedRoute` protects the home page

### Home

- home feed fetches fake posts and stories
- created posts also appear in home feed

### Search

- search section fetches fake users
- search works while typing

### Reels

- reels section is lazy loaded
- reels fetch data only when opened
- scrolling changes one reel at a time

### Create Post

- user can add title
- user can add caption
- user can choose an image
- created post is saved and shown in profile and home

### Profile

- shows signup details
- shows initials if no profile image is present
- shows created posts

## Routes

- `/signup` -> Signup page
- `/login` -> Login page
- `/forgot-password` -> Forgot password page
- `/home` -> Protected home page

## Project Structure

```text
src/
  components/
    BottomNavbar/
    CreatePostSection/
    ForgotPassword/
    Home/
    HomeFeed/
    Login/
    Post/
    ProfileSection/
    ProtectedRoute/
    ReelsSection/
    SearchSection/
    Signup/
```

## How To Run

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Notes

- this project is frontend only
- authentication and authorization are simple and handled in the browser
- fake API data is used for practice
