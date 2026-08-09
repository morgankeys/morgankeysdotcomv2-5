import { site } from '../data/site.js'
import { about } from '../data/about.js'
import { asset } from '../lib/asset.js'
import { HomeIcon, LinkedInIcon, GithubIcon } from './icons.jsx'
import './About.css'

export default function About() {
  return (
    <div className="about">
      <a className="about__home" href={asset(site.links.home)} aria-label="Back to home">
        <HomeIcon />
      </a>

      <header className="about__header">
        <img
          className="about__avatar"
          src={asset(site.profileImage)}
          alt={site.profileAlt}
          width="130"
          height="130"
        />
        <div className="about__intro">
          <h1 className="about__title">
            {about.heading}
            <span className="about__title-dot">.</span>
          </h1>
          <div className="about__socials">
            <a
              href={site.links.linkedin}
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn profile"
            >
              <LinkedInIcon />
            </a>
            <a
              href={site.links.github}
              target="_blank"
              rel="noreferrer"
              aria-label="Github profile"
            >
              <GithubIcon />
            </a>
          </div>
        </div>
      </header>

      <div className="about__prose">
        {about.paragraphs.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}

        <p>
          {about.closing}{' '}
          {about.resumes.map((resume, i) => (
            <span key={resume.href}>
              {i > 0 && <span className="about__separator"> | </span>}
              <a
                className="about__resume-link"
                href={resume.href}
                target="_blank"
                rel="noreferrer"
              >
                {resume.label}
              </a>
            </span>
          ))}
          .
        </p>
      </div>
    </div>
  )
}
