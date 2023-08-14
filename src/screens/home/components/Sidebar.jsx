import React from 'react'
import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined'
import {
  FilterNoneSharp as FilterNoneSharpIcon,
  ShareSharp as ShareSharpIcon,
  PlayCircleOutlineSharp as PlayCircleOutlineSharpIcon,
  OndemandVideoSharp as OndemandVideoSharpIcon,
  ExitToAppSharp as ExitToAppSharpIcon,
} from '@material-ui/icons'
import '../styles/SideBar.css'

const Sidebar = ({ showSidebar, setShowSidebar }) => {
  const redirectToHome = () => {
    if (window.location.pathname !== '/home') {
      window.location.href = '/home'
    }
  }
  const scrollToSharedSection = () => {
    if (window.location.pathname !== '/home') {
      window.location.href = '/home'
    }
    const dailymotionSection = document.getElementById('shared')
    if (dailymotionSection) {
      dailymotionSection.scrollIntoView({ behavior: 'smooth' })
    }
    setShowSidebar(false)
  }
  const scrollToAllSection = () => {
    if (window.location.pathname !== '/home') {
      window.location.href = '/home'
    }
    const allSection = document.getElementById('all')
    if (allSection) {
      allSection.scrollIntoView({ behavior: 'smooth' })
    }
    setShowSidebar(false)
  }
  const scrollToYoutubeSection = () => {
    if (window.location.pathname !== '/home') {
      window.location.href = '/home'
    }
    const youtubeSection = document.getElementById('youtube')
    if (youtubeSection) {
      youtubeSection.scrollIntoView({ behavior: 'smooth' })
    }
    setShowSidebar(false)
  }
  const scrollToDailymotionSection = () => {
    if (window.location.pathname !== '/home') {
      window.location.href = '/home'
    }
    const dailymotionSection = document.getElementById('dailymotion')
    if (dailymotionSection) {
      dailymotionSection.scrollIntoView({ behavior: 'smooth' })
    }
    setShowSidebar(false)
  }
  function logout() {
    localStorage.removeItem('token')
    window.location.href = '/login'
  }
  if (!showSidebar) return null
  return (
    <div className="sidebar-main-div">
      <button className="sidebar-btn" onClick={redirectToHome}>
        <HomeOutlinedIcon className="sidebar-icons" />
        Home
      </button>
      <button className="sidebar-btn" onClick={scrollToAllSection}>
        <FilterNoneSharpIcon className="sidebar-icons" />
        All
      </button>
      <button className="sidebar-btn" onClick={scrollToSharedSection}>
        <ShareSharpIcon className="sidebar-icons" />
        Shared
      </button>
      <button className="sidebar-btn" onClick={scrollToYoutubeSection}>
        <PlayCircleOutlineSharpIcon className="sidebar-icons" />
        Youtube
      </button>
      <button className="sidebar-btn" onClick={scrollToDailymotionSection}>
        <OndemandVideoSharpIcon className="sidebar-icons" />
        Dailymotion
      </button>
      <button className="sidebar-btn" onClick={logout}>
        <ExitToAppSharpIcon className="sidebar-icons" />
        Sign Out
      </button>
    </div>
  )
}

export default Sidebar
