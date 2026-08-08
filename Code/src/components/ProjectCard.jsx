import './ProjectCard.css'

function Meta({ project }) {
  return (
    <p className="meta">
      <span
        className="meta__chip"
        style={{ backgroundColor: project.accent || 'var(--color-text-muted)' }}
        aria-hidden="true"
      />
      {project.company}, {project.year}
    </p>
  )
}

// Case study: white rounded card with a "View case study" pill.
export function CaseStudyCard({ project }) {
  return (
    <article className="cs-card">
      <h3 className="cs-card__title">{project.title}</h3>
      <div className="cs-card__media">
        <img src={project.image} alt={project.alt} loading="lazy" />
      </div>
      <a className="cs-card__cta" href={project.href || '#'}>
        View case study
      </a>
      <div className="cs-card__summary">
        <p className="cs-card__desc">{project.description}</p>
        <Meta project={project} />
      </div>
    </article>
  )
}

// Other project: full-width, no card chrome.
export function OtherProjectItem({ project }) {
  return (
    <article className="op-item">
      <h3 className="op-item__title">{project.title}</h3>
      <div className="op-item__media">
        <img src={project.image} alt={project.alt} loading="lazy" />
      </div>
      <div className="op-item__summary">
        <p className="op-item__desc">{project.description}</p>
        <Meta project={project} />
      </div>
    </article>
  )
}
