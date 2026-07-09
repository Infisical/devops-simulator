import type { GameEvent } from './types'

// A recurring three-part storyline: the migration that refuses to die.
// It only shows up if you've met the one before it, and it remembers you.
export const NEMESIS_EVENTS: GameEvent[] = [
  {
    id: 'nemesis-migration-1',
    minRank: 0,
    maxRank: 2,
    tag: 'nemesis',
    setFlag: 'migration_started',
    log: 'You find a Jira epic called "DB Migration — Q1" last touched three years ago. It has no owner and one comment: "almost done!"',
    choices: [
      { label: 'Adopt it. Someone has to.', result: 'You are now the proud, unpaid owner of a migration nobody remembers starting.', effects: { sanity: -6, reputation: 5 } },
      { label: 'Close it as "won\'t fix"', result: 'It reopens itself. Nobody reopened it. It just... reopened.', effects: { sanity: 4, karma: -3 } },
      { label: 'Pretend you never saw it', result: 'A wise, temporary peace. It knows where you live.', effects: { sanity: 6 } },
    ],
  },
  {
    id: 'nemesis-migration-2',
    minRank: 1,
    maxRank: 4,
    tag: 'nemesis',
    requiresFlag: 'migration_started',
    setFlag: 'migration_escalated',
    log: 'The migration is back. It has grown a second migration inside it, like a Russian nesting doll made of regret.',
    choices: [
      { label: 'Finally finish it, all the way, for real', result: 'Fourteen hours later it is done. You have aged visibly. The team throws you a small, confused party.', effects: { sanity: -14, uptime: 8, reputation: 12 } },
      { label: 'Migrate the migration to a new migration', result: 'This is not a joke. This is now your actual plan. It might even work.', effects: { sanity: -8, uptime: -4 } },
      { label: 'Add "TODO: fix later" and walk away again', result: 'The TODO comment is now older than some employees.', effects: { sanity: 5, reputation: -6 } },
    ],
  },
  {
    id: 'nemesis-migration-3',
    minRank: 3,
    maxRank: 5,
    tag: 'nemesis',
    requiresFlag: 'migration_escalated',
    setFlag: 'migration_resolved',
    log: 'Auditors ask about "DB Migration — Q1." It is, astonishingly, still open. It has outlasted two CTOs and one acquisition.',
    choices: [
      { label: 'Kill it in front of everyone, publicly, in the all-hands', result: 'You close the ticket live on screen-share. The room applauds. You will never top this professional high.', effects: { sanity: 12, reputation: 15, karma: 5 } },
      { label: 'Quietly mark it "done" without actually finishing it', result: 'The lie holds for exactly one more audit cycle. You know this. You do it anyway.', effects: { sanity: 6, reputation: -10, karma: -8 } },
      { label: 'Frame the original ticket and hang it on your wall', result: 'It is, at this point, a load-bearing piece of company history. Nobody touches it again.', effects: { sanity: 4, karma: 6 } },
    ],
  },
]
