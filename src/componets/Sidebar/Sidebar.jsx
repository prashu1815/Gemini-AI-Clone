import React, { useState } from 'react'
import './Sidebar.css' // Import the CSS for the sidebar styling
import { assets } from '../../assets/assets' // Import assets (icons and images)

// Sidebar component
const Sidebar = () => {

  // State to track if the sidebar is extended (expanded) or not
  const [extended, setExtended] = useState(false)

  return (
    <div className={`sidebar ${extended ? 'extended' : ''}`}>
      <div className="top">
        {/* Menu icon that toggles the extended state */}
        <img 
          onClick={() => setExtended(prev => !prev)} 
          className='menu' 
          src={assets.menu} 
          alt="" 
        />
        
        {/* New Chat section */}
        <div className='new-chat'>
          <img src={assets.plus} alt="" /> {/* Plus icon for "New Chat" */}
          
          {/* Conditionally render "New Chat" text when the sidebar is extended */}
          {extended ? <p>New Chat</p> : null}
        </div>

        {/* Recent section (conditionally displayed when sidebar is extended) */}
        {extended ? (
          <div className="recent">
            <p className="recent-title">
              Recent {/* Title for recent chats */}
            </p>
            
            {/* Recent chat entry */}
            <div className="recent-entry">
              <img src={assets.message} alt="" /> {/* Icon for message */}
              <p>What is react....</p> {/* Sample recent chat */}
            </div>
          </div>
        ) : null}
        
      </div>

      <div className="bottom">
        {/* Bottom section items (Help, Activity, Settings) */}
        <div className="bottom-item recent-entry">
          <img src={assets.question} alt="" /> {/* Help icon */}
          {extended ? <p>Help</p> : null} {/* Conditionally render text when extended */}
        </div>

        <div className="bottom-item recent-entry">
          <img src={assets.history} alt="" /> {/* Activity icon */}
          {extended ? <p>Activity</p> : null} {/* Conditionally render text when extended */}
        </div>

        <div className="bottom-item recent-entry">
          <img src={assets.settings} alt="" /> {/* Settings icon */}
          {extended ? <p>Settings</p> : null} {/* Conditionally render text when extended */}
        </div>
      </div>
    </div>
  )
}

export default Sidebar
