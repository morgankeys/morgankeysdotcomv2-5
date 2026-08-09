// Global site content and links, transcribed from morgankeys.com.

export const site = {
  name: 'Morgan Keys',
  handle: '@morgankeys',
  profileImage: '/images/profile.png',
  profileAlt: 'Image of Morgan',
  // Sidebar bio lines (each is a separate line in the design)
  bio: [
    'Product thinker with deep UX expertise',
    'Focus on enterprise products and platforms',
    'Master’s in Human-Computer Interaction, Bachelor’s in Math & Creative Writing',
  ],
  links: {
    // Root-relative page paths go through asset() so they survive the deploy base.
    home: '/',
    about: '/about/',
    resume:
      'https://docs.google.com/document/d/e/2PACX-1vTkTaSRuMrBZQGKysG3n6sVdmneoeBud8exiNz8Z0zjCCtpDurUjj-7lRTvvuCcmkjDMptOgK-74TPV/pub',
    linkedin: 'https://www.linkedin.com/in/morgankeys/',
    github: 'https://github.com/morgankeys',
    x: 'https://x.com/morgankeys',
    threads: 'https://www.threads.com/@morgankeys',
  },
  // Client logos shown under "Client projects:" — order matches the live site.
  clientLogos: [
    { id: 'google', label: 'Google', type: 'svg' },
    { id: 'microsoft', label: 'Microsoft', type: 'svg' },
    { id: 'cisco', label: 'Cisco', type: 'image', image: '/images/logo-cisco.png' },
    { id: 'gartner', label: 'Gartner', type: 'image', image: '/images/logo-gartner.png' },
  ],
}
