export const publication = {
  siteUrl: 'https://iqra.jarifurrahim.one',
  siteName: 'iqra · Reconnecting Intelligence With The Soul',
  author: {
    name: 'G. K. M. Jarif Ur Rahim',
    url: 'https://jarifurrahim.one',
    evidenceUrl: 'https://jarifurrahim.one/evidence',
    orcid: 'https://orcid.org/0009-0004-0763-322X',
  },
  editions: {
    '0.1': {
      title: 'Reconnecting Intelligence With The Soul: Agency, Responsibility, and System Design in the Age of AI',
      doi: '10.5281/zenodo.21895928',
      doiUrl: 'https://doi.org/10.5281/zenodo.21895928',
      recordUrl: 'https://zenodo.org/records/21895928',
      rootUrl: 'https://iqra.jarifurrahim.one/',
      label: 'Book Edition 0.1',
    },
    '2.0': {
      title: 'Reconnecting Intelligence With The Soul: Witness, Embodiment & Transformed Action',
      doi: '10.5281/zenodo.21925197',
      doiUrl: 'https://doi.org/10.5281/zenodo.21925197',
      recordUrl: 'https://zenodo.org/records/21925197',
      rootUrl: 'https://iqra.jarifurrahim.one/edition-2/',
      label: 'Book Edition 2.0',
    },
  },
};

export const themes = {
  'responsible-ai-human-oversight': {
    title: 'Responsible AI, Human Oversight & Agency',
    description: 'A reading path for questions about AI output, human judgment, permissions, responsibility, and the limits of automation.',
    boundary: 'These chapters explore accountable use and human answerability. They are not a legal-compliance manual, safety certification, or claim that AI possesses lived responsibility.',
    questions: [
      'How can AI be used without surrendering judgment or responsibility?',
      'What should remain under human review when systems become capable of acting?',
    ],
  },
  'evidence-trust-digital-identity': {
    title: 'Evidence, Trust & Digital Identity',
    description: 'A reading path for questions about provenance, traceable records, verification habits, trust, and durable public evidence.',
    boundary: 'These chapters offer conceptual and case-based reading. They do not certify any platform, person, or record as universally trustworthy.',
    questions: [
      'How can a reader distinguish a claim from an inspectable evidence trail?',
      'Why do source, revision history, and public record matter in synthetic-information environments?',
    ],
  },
  'career-capability-responsible-work': {
    title: 'Career Capability & Responsible Work',
    description: 'A reading path for questions about learning, capability, agency, meaningful work, career reflection, and responsibility after acquisition.',
    boundary: 'These chapters are reflective and educational. They are not individual employment, financial, or clinical advice, and they do not promise job outcomes.',
    questions: [
      'What is the difference between information, skill, capability, and agency?',
      'How can work remain responsible after self-proof or external status stops being the only measure?',
    ],
  },
  'human-centred-systems-design': {
    title: 'Human-Centred Systems Design',
    description: 'A reading path for questions about permissions, feedback, repair, governance, system design, and technology that protects human purpose.',
    boundary: 'These chapters present principles, documented cases, and bounded design questions. They are not a claim of universal architecture superiority or enterprise certification.',
    questions: [
      'What makes a system answerable to people rather than only to scale?',
      'How can feedback, permissions, repair, and accountable records shape a more humane technical system?',
    ],
  },
};

const chapter = (edition, readerQuestion, themeIds, boundary, bridge) => ({ edition, readerQuestion, themeIds, boundary, bridge });

export const chapterDiscovery = {
  '00-the-awakening-from-classroom-to-consulting': chapter('0.1', 'How can learning become capability that matters in life?', ['career-capability-responsible-work'], 'A personal-origin chapter that opens a reader question; it does not generalise one career path into a universal model.'),
  '01-the-day-you-realise': chapter('0.1', 'What changes when career is understood as more than a job title?', ['career-capability-responsible-work'], 'A final reflective reading for readers who have travelled through the book; it does not provide employment guarantees.', { href: 'https://iqra.jarifurrahim.one/edition-2/chapters/03-action-after-acquisition.html', label: 'Read the related Edition 2 inquiry: Action After Acquisition' }),
  '02-the-question-of-capability': chapter('0.1', 'What separates information, skill, capability, agency, and responsibility?', ['career-capability-responsible-work'], 'A conceptual distinction, not a psychometric assessment or career diagnosis.'),
  '03-bridging-the-intelligence-gap': chapter('0.1', 'How can people use AI while retaining judgment, context, and accountability?', ['responsible-ai-human-oversight', 'career-capability-responsible-work'], 'A human-use inquiry; it does not claim that tool output replaces lived judgment.', { href: 'https://iqra.jarifurrahim.one/edition-2/chapters/04-inquiry-intelligence-and-the-tool-that-cannot-witness.html', label: 'Read the related Edition 2 inquiry: Inquiry, Intelligence, and the Tool That Cannot Witness' }),
  '04-when-sand-learned-to-think': chapter('0.1', 'What is the boundary between technical output, lived experience, and moral responsibility?', ['responsible-ai-human-oversight'], 'A philosophical boundary chapter; it does not assert empirical proof about consciousness or soul.'),
  '05-the-philosophy-prompt': chapter('0.1', 'How can a visible worldview orient human–AI inquiry without replacing evidence?', ['responsible-ai-human-oversight'], 'An inquiry framework, not a substitute for evidence or a universal doctrine.'),
  '06-the-dead-internet-and-the-living-entity': chapter('0.1', 'Why do provenance, accountable sources, and verification habits matter online?', ['evidence-trust-digital-identity'], 'A source-literacy chapter; it does not certify individual online actors or platforms as trustworthy.'),
  '07-the-architecture-of-monopoly': chapter('0.1', 'How do defaults, dependence, discoverability, and meaningful choice shape digital power?', ['human-centred-systems-design'], 'A systems lens for reflection; it is not a complete market or policy analysis.'),
  '08-decentralised-trust': chapter('0.1', 'How can transparency, portability, and accountable process affect trust?', ['evidence-trust-digital-identity'], 'A conceptual trust discussion, not a security guarantee or endorsement of a specific technology.'),
  '09-when-the-comment-box-becomes-a-blueprint': chapter('0.1', 'How can unstructured feedback become a responsible system-design brief?', ['human-centred-systems-design', 'evidence-trust-digital-identity'], 'A documented case-method discussion; it does not guarantee that every feedback set produces a valid blueprint.'),
  '10-agentos-responsible-operating-layer': chapter('0.1', 'What permissions, memory boundaries, and review paths matter when systems can act?', ['responsible-ai-human-oversight', 'human-centred-systems-design'], 'A bounded architecture discussion; it distinguishes design from autonomous authority.', { href: 'https://iqra.jarifurrahim.one/edition-2/chapters/04-inquiry-intelligence-and-the-tool-that-cannot-witness.html', label: 'Read the related Edition 2 inquiry: Inquiry, Intelligence, and the Tool That Cannot Witness' }),
  '11-systems-that-heal-not-just-scale': chapter('0.1', 'What would it mean for a system to restore agency instead of only accelerating extraction?', ['human-centred-systems-design', 'career-capability-responsible-work'], 'A design framework for reflection, not a validated universal outcome model.'),
  '12-the-weight-of-clarity': chapter('0.1', 'How can clarity change the responsibility to act?', ['career-capability-responsible-work'], 'A reflective chapter about perception and responsibility; it is not mental-health treatment or a certainty claim.'),
  '13-the-civilisational-cycle': chapter('0.1', 'What happens when capability grows faster than accountable cultural practice?', ['responsible-ai-human-oversight'], 'A civilisational reflection, not a predictive model of society.'),
  '14-the-four-layers-of-agency': chapter('0.1', 'How can creation, dependence, stewardship, and responsibility be thought through in an age of powerful tools?', ['human-centred-systems-design'], 'A philosophical framework, not a scientific taxonomy.'),
  '15-the-pure-spark': chapter('0.1', 'What inward work cannot be outsourced to technology?', ['career-capability-responsible-work'], 'A personal and philosophical reflection, not empirical proof of spiritual claims.'),
  '16-the-horse-the-donkey-and-the-observer': chapter('0.1', 'Why is careful categorisation necessary before assigning value or meaning?', ['evidence-trust-digital-identity'], 'A reasoning chapter, not a replacement for domain-specific expertise.'),
  '17-awaken-jago-bodhi-shema-iqra': chapter('0.1', 'How can words from distinct traditions be read respectfully without erasing difference?', ['evidence-trust-digital-identity'], 'A comparative-method chapter; it preserves tradition-specific meaning and makes no synthesis claim.', { href: 'https://iqra.jarifurrahim.one/edition-2/chapters/05-words-at-the-boundary.html', label: 'Read the related Edition 2 appendix: Words at the Boundary' }),
  '18-great-responsibility-makes-great-power': chapter('0.1', 'How do responsibility, trust, skill, evidence, and resources relate in real work?', ['career-capability-responsible-work', 'responsible-ai-human-oversight'], 'A reflective account of responsibility, not a promise of professional outcome.'),
  '19-the-builders-evidence': chapter('0.1', 'How can documented work, limitations, and revision records make an idea inspectable?', ['evidence-trust-digital-identity', 'human-centred-systems-design'], 'A documentation and evidence framework; it does not claim that all records are independently verified.'),
  '20-a-charter-for-the-age-of-agents': chapter('0.1', 'What principles can guide powerful systems while protecting human purpose, agency, and repair?', ['responsible-ai-human-oversight', 'human-centred-systems-design'], 'A practical charter for reflection, not a regulatory standard or certification.'),
  '01-embodiment-is-a-condition-not-an-explanation': chapter('2.0', 'How can embodiment be recognised as a condition without turning biology into an ultimate explanation?', ['career-capability-responsible-work'], 'A bounded inquiry into finite life and meaning; it does not make scientific or theological final claims.'),
  '02-witness-beyond-the-argument': chapter('2.0', 'What remains when a lived question exceeds instrumental explanation?', ['career-capability-responsible-work'], 'A reflective inquiry, not a proof of metaphysical conclusions.'),
  '03-action-after-acquisition': chapter('2.0', 'How can work remain purposeful after compulsive self-proof loses authority?', ['career-capability-responsible-work', 'human-centred-systems-design'], 'A reflective work-and-action chapter, not individual career or financial advice.', { href: 'https://iqra.jarifurrahim.one/chapters/01-the-day-you-realise.html', label: 'Read the related Edition 0.1 final chapter: The Day You Realise Your Career Was Never About a Job' }),
  '04-inquiry-intelligence-and-the-tool-that-cannot-witness': chapter('2.0', 'How should AI output, education, lived responsibility, and witness be distinguished?', ['responsible-ai-human-oversight'], 'A boundary chapter; it does not claim AI consciousness, soul, or autonomous moral standing.', { href: 'https://iqra.jarifurrahim.one/chapters/03-bridging-the-intelligence-gap.html', label: 'Read the related Edition 0.1 chapter: Bridging the Intelligence Gap' }),
  '05-words-at-the-boundary': chapter('2.0', 'How can comparative reading preserve difference rather than collapse traditions into a single doctrine?', ['evidence-trust-digital-identity'], 'A methodological appendix, not a claim that different traditions are equivalent.', { href: 'https://iqra.jarifurrahim.one/chapters/17-awaken-jago-bodhi-shema-iqra.html', label: 'Read the related Edition 0.1 chapter: Awaken, Jago, Bodhi, Shema, Iqra' }),
};

export const chapterSlug = (fileName) => fileName.replace(/\.md$/, '');
export const themeHref = (themeId) => `${publication.siteUrl}/themes/${themeId}.html`;
