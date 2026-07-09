import type { GameEvent } from './types'

export const DISRUPTION_EVENTS: GameEvent[] = [
  {
    id: 'disruption-acquired',
    minRank: 0,
    tag: 'disruption',
    log: 'BREAKING: your company has been acquired by MegaCorp. New Slack, new stack, new mandatory training titled "Welcome to the Family" that is four hours long.',
    choices: [
      { label: 'Learn the new stack fast', result: 'You are now fluent in a tool you will forget existed the moment you leave. This is, unfortunately, most tools.', effects: { sanity: -8, reputation: 6 } },
      { label: 'Quietly keep using the old tools', result: 'This works until an audit finds you. Then it does not, spectacularly, in a meeting with three VPs.', effects: { sanity: 4, reputation: -4 } },
      { label: 'Volunteer to lead the integration', result: 'More work, more visibility, more 2am calls with a timezone you had to look up.', effects: { sanity: -12, reputation: 12 } },
    ],
  },
  {
    id: 'disruption-collapse',
    minRank: 0,
    tag: 'disruption',
    log: 'The company runs out of runway. A skeleton crew, including you, keeps the lights on during the wind-down, like the crew of a ship that already hit the iceberg but the wifi still works.',
    choices: [
      { label: 'Keep production alive out of principle', result: 'Noble. Also unpaid overtime for a company that, on paper, no longer exists.', effects: { sanity: -10, karma: 10 } },
      { label: 'Start job hunting immediately', result: 'Smart. Somebody has to keep paying rent, and it is not going to be the company Slack workspace.', effects: { sanity: 6, karma: -3 } },
      { label: 'Negotiate a new role at whoever buys the assets', result: 'You survive the collapse with a new badge, a new logo on your laptop sticker collection, and the same laptop.', effects: { reputation: 6, sanity: -4 } },
    ],
  },
  {
    id: 'disruption-poached',
    minRank: 1,
    tag: 'disruption',
    log: 'A recruiter DMs you: "better culture, better pay, better on-call." (The last one is always, always a lie. It has never once been true.)',
    choices: [
      { label: 'Take the offer', result: 'New company, same pager, nicer swag, and a Notion page that describes the culture using the word "hustle."', effects: { sanity: 8, reputation: 3 } },
      { label: 'Use it as leverage to negotiate a raise where you are', result: 'It works. Your manager is visibly relieved and slightly annoyed, in that order, within the same sentence.', effects: { sanity: 5, reputation: 4 } },
      { label: 'Ignore it, you\'re not looking', result: 'The recruiter DMs you again in exactly six weeks, undeterred, like a Roomba bumping into the same wall.', effects: { sanity: 2 } },
    ],
  },
  {
    id: 'disruption-funding-round',
    minRank: 1,
    tag: 'disruption',
    log: 'The company closes a big funding round. Headcount doubles in a month. So does the number of Slack channels named after acronyms nobody has defined yet.',
    choices: [
      { label: 'Push to hire slow and onboard well', result: 'Fewer hires, higher quality. This is the correct answer and, as always, the one nobody fully listens to.', effects: { reputation: 8, sanity: -4 } },
      { label: 'Let the hiring machine run', result: 'Twelve new engineers, four new frameworks, and one shared understanding of absolutely none of it.', effects: { sanity: -10, uptime: -4 } },
      { label: 'Use the funding to finally fix the infra debt', result: 'A rare, glorious quarter where you get to build instead of firefight. You almost forget what this feels like.', effects: { sanity: 10, uptime: 10, reputation: 6 } },
    ],
  },
  {
    id: 'disruption-new-cto',
    minRank: 2,
    tag: 'disruption',
    log: 'A new CTO joins from a Big Tech company and wants to "modernize everything," starting yesterday, using a framework that came out last Tuesday.',
    choices: [
      { label: 'Push back with data on what actually needs fixing', result: 'They respect it, eventually. The first month is rough, mostly in the form of very pointed one-on-ones.', effects: { sanity: -6, reputation: 8 } },
      { label: 'Go along with the rewrite', result: 'Six months later, half of it is rewritten. The other half was fine to begin with, and everyone quietly knows it.', effects: { sanity: -10, uptime: -4 } },
      { label: 'Become their trusted go-to person immediately', result: 'Political capital acquired. You will spend it recklessly within the fiscal year.', effects: { reputation: 10, karma: -4 } },
    ],
  },
  {
    id: 'disruption-outage-goes-public',
    minRank: 2,
    tag: 'disruption',
    log: 'A major outage trends on social media. Someone screenshots your status page mid-incident, the one that still says "investigating" from four hours ago.',
    choices: [
      { label: 'Own it publicly with a clear postmortem', result: 'The internet respects the honesty for about a day, then moves on to a different company\'s outage.', effects: { reputation: 8, sanity: -8 } },
      { label: 'Let comms handle all public statements', result: 'The statement says nothing specific, using four sentences to convey zero information. People notice.', effects: { sanity: 4, reputation: -6 } },
      { label: 'Post a meme about it from the company account', result: 'Either the funniest or the worst decision of your career. Genuinely, to this day, unclear which.', effects: { karma: 6, reputation: -2, sanity: 6 } },
    ],
  },
]

export const EXIT_EVENTS: GameEvent[] = [
  {
    id: 'exit-clean-ipo',
    minRank: 5,
    tag: 'exit',
    log: 'The company files for IPO. Your stock options, on paper, are suddenly worth a house. Two houses, maybe, if you pick a smaller house and a bigger amount of luck.',
    choices: [
      { label: 'Cash out and retire', result: '', effects: {} },
      { label: 'Hold and hope it goes higher', result: 'It does not go higher. It goes exactly, precisely, the other way, like it was waiting for you to say that.', effects: { sanity: -20, reputation: -10 } },
    ],
  },
  {
    id: 'exit-quiet-acquihire',
    minRank: 5,
    tag: 'exit',
    log: 'A much bigger company quietly acquires yours mainly for the team. Your options vest immediately, in full, in a Google Doc titled "Project Bluebird" that you were not supposed to see two weeks early.',
    choices: [
      { label: 'Cash out and retire', result: '', effects: {} },
      { label: 'Take the new role they\'re offering instead', result: 'The new role is the same job, same pager, with a nicer badge and a slightly better parking spot.', effects: { sanity: -10, reputation: 4 } },
    ],
  },
  {
    id: 'exit-modest-exit',
    minRank: 5,
    tag: 'exit',
    log: 'The company gets acquired for a modest sum. Not a headline number, not a press release anyone will remember, but your options finally, actually, technically vest.',
    choices: [
      { label: 'Cash out and retire', result: '', effects: {} },
      { label: 'Stay for the "exciting next chapter"', result: 'The next chapter reads exactly like the last one, just with a new cover and a new set of Jira boards.', effects: { sanity: -12 } },
    ],
  },
]
