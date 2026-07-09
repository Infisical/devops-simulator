import type { GameEvent } from './types'

export const DISRUPTION_EVENTS: GameEvent[] = [
  {
    id: 'disruption-acquired',
    minRank: 0,
    tag: 'disruption',
    log: 'BREAKING: your company has been acquired by MegaCorp. New Slack, new stack, new mandatory trainings.',
    choices: [
      { label: 'Learn the new stack fast', result: 'You are now fluent in a tool you will forget existed in two years.', effects: { sanity: -8, reputation: 6 } },
      { label: 'Quietly keep using the old tools', result: 'This works until an audit finds you. Then it does not.', effects: { sanity: 4, reputation: -4 } },
      { label: 'Volunteer to lead the integration', result: 'More work, more visibility, more 2am calls with a new timezone.', effects: { sanity: -12, reputation: 12 } },
    ],
  },
  {
    id: 'disruption-collapse',
    minRank: 0,
    tag: 'disruption',
    log: 'The company runs out of runway. A skeleton crew, including you, keeps the lights on during the wind-down.',
    choices: [
      { label: 'Keep production alive out of principle', result: 'Noble. Also unpaid overtime for a company that no longer really exists.', effects: { sanity: -10, karma: 10 } },
      { label: 'Start job hunting immediately', result: 'Smart. Somebody has to keep paying rent.', effects: { sanity: 6, karma: -3 } },
      { label: 'Negotiate a new role at whoever buys the assets', result: 'You survive the collapse with a new badge and the same laptop.', effects: { reputation: 6, sanity: -4 } },
    ],
  },
  {
    id: 'disruption-poached',
    minRank: 1,
    tag: 'disruption',
    log: 'A recruiter DMs you: "better culture, better pay, better on-call." (The last one is a lie.)',
    choices: [
      { label: 'Take the offer', result: 'New company, same pager, nicer swag.', effects: { sanity: 8, reputation: 3 } },
      { label: 'Use it as leverage to negotiate a raise where you are', result: 'It works. Your manager is visibly relieved and slightly annoyed.', effects: { sanity: 5, reputation: 4 } },
      { label: 'Ignore it, you\'re not looking', result: 'The recruiter DMs you again in exactly six weeks.', effects: { sanity: 2 } },
    ],
  },
  {
    id: 'disruption-funding-round',
    minRank: 1,
    tag: 'disruption',
    log: 'The company closes a big funding round. Headcount doubles in a month. So does the chaos.',
    choices: [
      { label: 'Push to hire slow and onboard well', result: 'Fewer hires, higher quality. This is the correct answer and nobody listens to it fully.', effects: { reputation: 8, sanity: -4 } },
      { label: 'Let the hiring machine run', result: 'Twelve new engineers, four new frameworks, one shared understanding of none of it.', effects: { sanity: -10, uptime: -4 } },
      { label: 'Use the funding to finally fix the infra debt', result: 'A rare, glorious quarter where you get to build instead of firefight.', effects: { sanity: 10, uptime: 10, reputation: 6 } },
    ],
  },
  {
    id: 'disruption-new-cto',
    minRank: 2,
    tag: 'disruption',
    log: 'A new CTO joins from a Big Tech company and wants to "modernize everything," starting yesterday.',
    choices: [
      { label: 'Push back with data on what actually needs fixing', result: 'They respect it, eventually. The first month is rough.', effects: { sanity: -6, reputation: 8 } },
      { label: 'Go along with the rewrite', result: 'Six months later, half of it is rewritten. The other half was fine to begin with.', effects: { sanity: -10, uptime: -4 } },
      { label: 'Become their trusted go-to person immediately', result: 'Political capital acquired. Use wisely.', effects: { reputation: 10, karma: -4 } },
    ],
  },
  {
    id: 'disruption-outage-goes-public',
    minRank: 2,
    tag: 'disruption',
    log: 'A major outage trends on social media. Someone screenshots your status page mid-incident.',
    choices: [
      { label: 'Own it publicly with a clear postmortem', result: 'The internet respects the honesty for about a day, then moves on.', effects: { reputation: 8, sanity: -8 } },
      { label: 'Let comms handle all public statements', result: 'The statement says nothing specific. People notice.', effects: { sanity: 4, reputation: -6 } },
      { label: 'Post a meme about it from the company account', result: 'Either the funniest or the worst decision of your career. Genuinely unclear which.', effects: { karma: 6, reputation: -2, sanity: 6 } },
    ],
  },
]

export const EXIT_EVENTS: GameEvent[] = [
  {
    id: 'exit-clean-ipo',
    minRank: 5,
    tag: 'exit',
    log: 'The company files for IPO. Your stock options, on paper, are suddenly worth a house. Two houses, maybe.',
    choices: [
      { label: 'Cash out and retire', result: '', effects: {} },
      { label: 'Hold and hope it goes higher', result: 'It does not go higher. It goes exactly the other way.', effects: { sanity: -20, reputation: -10 } },
    ],
  },
  {
    id: 'exit-quiet-acquihire',
    minRank: 5,
    tag: 'exit',
    log: 'A much bigger company quietly acquires yours mainly for the team. Your options vest immediately, in full.',
    choices: [
      { label: 'Cash out and retire', result: '', effects: {} },
      { label: 'Take the new role they\'re offering instead', result: 'The new role is the same job with a nicer badge.', effects: { sanity: -10, reputation: 4 } },
    ],
  },
  {
    id: 'exit-modest-exit',
    minRank: 5,
    tag: 'exit',
    log: 'The company gets acquired for a modest sum. Not a headline number, but your options finally, actually vest.',
    choices: [
      { label: 'Cash out and retire', result: '', effects: {} },
      { label: 'Stay for the "exciting next chapter"', result: 'The next chapter reads exactly like the last one.', effects: { sanity: -12 } },
    ],
  },
]
