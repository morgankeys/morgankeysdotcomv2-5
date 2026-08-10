import { site } from '../data/site.js'
import { opengovCoa } from '../data/opengovCoa.js'
import { asset } from '../lib/asset.js'
import { BackIcon } from './icons.jsx'
import './OpenGovCoa.css'

export default function OpenGovCoa() {
  const { logo, hero, prototype, sections, footer, title } = opengovCoa

  return (
    <article className="coa">
      <header className="coa__top">
        <a className="coa__back" href={asset(site.links.home)} aria-label="Back">
          <BackIcon />
        </a>
        <p className="coa__brand">{site.name}</p>
      </header>

      <div className="coa__intro">
        <img
          className="coa__logo"
          src={asset(logo.src)}
          alt={logo.alt}
          width="80"
          height="80"
        />
        <h1 className="coa__title">{title}</h1>
        <img
          className="coa__hero"
          src={asset(hero.src)}
          alt={hero.alt}
          width="877"
          height="551"
        />
      </div>

      <aside className="coa__prototype">
        <div className="coa__prototype-copy">
          <p className="coa__prototype-eyebrow">{prototype.eyebrow}</p>
          <p className="coa__prototype-body">{prototype.body}</p>
          <a
            className="coa__prototype-cta"
            href={prototype.cta.href}
            target="_blank"
            rel="noreferrer"
          >
            {prototype.cta.label}
          </a>
        </div>
        <img
          className="coa__prototype-image"
          src={asset(prototype.image.src)}
          alt={prototype.image.alt}
          width="295"
          height="179"
        />
      </aside>

      <div className="coa__sections">
        {sections.map((section) => (
          <section key={section.id} className="coa__section" id={section.id}>
            <h2 className="coa__heading">{section.heading}</h2>
            {section.paragraphs.map((paragraph) => (
              <p key={paragraph} className="coa__body">
                {paragraph}
              </p>
            ))}
            {section.image && (
              <img
                className={`coa__figure${section.image.size ? ` coa__figure--${section.image.size}` : ''}`}
                src={asset(section.image.src)}
                alt={section.image.alt}
                loading="lazy"
              />
            )}
          </section>
        ))}
      </div>

      <p className="coa__footer">{footer}</p>
    </article>
  )
}
