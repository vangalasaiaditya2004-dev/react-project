import './BottomNavbar.css'

function BottomNavbar({ activeTab, setActiveTab }) {
  const tabs = [
    { name: 'home', label: 'Home' },
    { name: 'search', label: 'Search' },
    { name: 'reels', label: 'Reels' },
    { name: 'create', label: 'Create Post' },
    { name: 'profile', label: 'Profile' },
  ]

  function renderIcon(tabName) {
    if (tabName === 'home') {
      return (
        <svg viewBox="0 0 24 24" className="nav-icon" aria-hidden="true">
          <path d="M3 10.5 12 3l9 7.5V21h-6v-6H9v6H3z" fill="none" stroke="currentColor" strokeWidth="2" />
        </svg>
      )
    }

    if (tabName === 'search') {
      return (
        <svg viewBox="0 0 24 24" className="nav-icon" aria-hidden="true">
          <circle cx="11" cy="11" r="6" fill="none" stroke="currentColor" strokeWidth="2" />
          <path d="M20 20l-4.2-4.2" fill="none" stroke="currentColor" strokeWidth="2" />
        </svg>
      )
    }

    if (tabName === 'reels') {
      return (
        <svg viewBox="0 0 24 24" className="nav-icon" aria-hidden="true">
          <rect x="4" y="4" width="16" height="16" rx="2" fill="none" stroke="currentColor" strokeWidth="2" />
          <path d="M10 9.5v5l4-2.5z" fill="currentColor" />
        </svg>
      )
    }

    if (tabName === 'create') {
      return (
        <svg viewBox="0 0 24 24" className="nav-icon" aria-hidden="true">
          <rect x="4" y="4" width="16" height="16" rx="2" fill="none" stroke="currentColor" strokeWidth="2" />
          <path d="M12 8v8M8 12h8" fill="none" stroke="currentColor" strokeWidth="2" />
        </svg>
      )
    }

    return (
      <svg viewBox="0 0 24 24" className="nav-icon" aria-hidden="true">
        <circle cx="12" cy="8" r="3.5" fill="none" stroke="currentColor" strokeWidth="2" />
        <path d="M5 20c1.5-3.5 4-5 7-5s5.5 1.5 7 5" fill="none" stroke="currentColor" strokeWidth="2" />
      </svg>
    )
  }

  return (
    <div className="bottom-navbar">
      {tabs.map((tab) => (
        <button
          key={tab.name}
          type="button"
          className={activeTab === tab.name ? 'nav-button active' : 'nav-button'}
          onClick={() => setActiveTab(tab.name)}
          aria-label={tab.label}
          title={tab.label}
        >
          {renderIcon(tab.name)}
        </button>
      ))}
    </div>
  )
}

export default BottomNavbar
