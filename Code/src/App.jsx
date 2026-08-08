import Sidebar from './components/Sidebar.jsx'
import CaseStudies from './components/CaseStudies.jsx'
import OtherProjects from './components/OtherProjects.jsx'
import './App.css'

export default function App() {
  return (
    <div className="layout">
      <Sidebar />
      <main className="content">
        <CaseStudies />
        <OtherProjects />
      </main>
    </div>
  )
}
