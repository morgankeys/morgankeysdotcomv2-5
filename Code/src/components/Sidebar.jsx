import { site } from '../data/site.js'
import { asset } from '../lib/asset.js'
import {
  LinkedInIcon,
  GithubIcon,
  GoogleLogo,
  MicrosoftLogo,
} from './icons.jsx'
import './Sidebar.css'

function ClientLogo({ logo }) {
  if (logo.type === 'svg') {
    if (logo.id === 'google') return <GoogleLogo className="sidebar__logo-img" />
    if (logo.id === 'microsoft')
      return <MicrosoftLogo className="sidebar__logo-img" />
    return null
  }
  return (
    <img
      className="sidebar__logo-img"
      src={asset(logo.image)}
      alt={`${logo.label} logo`}
      loading="lazy"
    />
  )
}

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar__top">
        <img
          className="sidebar__avatar"
          src={asset(site.profileImage)}
          alt={site.profileAlt}
          width="128"
          height="128"
        />
        <div className="sidebar__id">
          <h1 className="sidebar__name">{site.name}</h1>
          <p className="sidebar__handle">{site.handle}</p>
        </div>
        <div className="sidebar__socials">
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

      <div className="sidebar__body">
        <a
          className="sidebar__link sidebar__link--underline"
          href={site.links.resume}
          target="_blank"
          rel="noreferrer"
        >
          View resume
        </a>

        {site.bio.map((line) => (
          <p key={line} className="sidebar__bio">
            {line}
          </p>
        ))}

        <div className="sidebar__clients">
          <p className="sidebar__clients-label">Client projects:</p>
          <ul className="sidebar__logos">
            {site.clientLogos.map((logo) => (
              <li key={logo.id} className="sidebar__logo">
                <ClientLogo logo={logo} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </aside>
  )
}
