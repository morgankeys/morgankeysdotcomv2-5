import { caseStudies } from '../data/caseStudies.js'
import { CaseStudyCard } from './ProjectCard.jsx'
import './CaseStudies.css'

export default function CaseStudies() {
  return (
    <section className="case-studies" id="case-studies">
      <h2 className="section-label">Case studies</h2>
      <div className="case-studies__grid">
        {caseStudies.map((project) => (
          <CaseStudyCard key={project.id} project={project} />
        ))}
      </div>
    </section>
  )
}
