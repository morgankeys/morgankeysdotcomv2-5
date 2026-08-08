import { otherProjects } from '../data/otherProjects.js'
import { OtherProjectItem } from './ProjectCard.jsx'
import './OtherProjects.css'

export default function OtherProjects() {
  return (
    <section className="other-projects" id="other-projects">
      <h2 className="section-label">Other projects</h2>
      <div className="other-projects__list">
        {otherProjects.map((project) => (
          <OtherProjectItem key={project.id} project={project} />
        ))}
      </div>
    </section>
  )
}
