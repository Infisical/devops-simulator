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
    log: 'You find a Jira epic called "DB Migration — Q1" last touched three years ago. It has no owner and one comment, posted by someone who no longer works here: "almost done!"',
    choices: [
      { label: 'Adopt it. Someone has to.', result: 'You are now the proud, unpaid owner of a migration nobody remembers starting and everybody will blame you for finishing wrong.', effects: { sanity: -6, reputation: 5 } },
      { label: 'Close it as "won\'t fix"', result: 'It reopens itself overnight. Nobody reopened it. There is no explanation. There will never be an explanation.', effects: { sanity: 4, karma: -3 } },
      { label: 'Pretend you never saw it', result: 'A wise, temporary peace. It knows your name. It has always known your name.', effects: { sanity: 6 } },
    ],
  },
  {
    id: 'nemesis-migration-2',
    minRank: 1,
    maxRank: 4,
    tag: 'nemesis',
    requiresFlag: 'migration_started',
    setFlag: 'migration_escalated',
    log: 'The migration is back. It has grown a second migration inside it, like a Russian nesting doll made entirely of regret and unresolved comments.',
    choices: [
      { label: 'Finally finish it, all the way, for real', result: 'Fourteen hours later it is done. You have aged visibly. The team throws you a small, confused party with a cake that says "congrats?"', effects: { sanity: -14, uptime: 8, reputation: 12 } },
      { label: 'Migrate the migration to a new migration', result: 'This is not a joke. This is now your actual, approved, funded plan. It might even work. Nobody is more surprised than you.', effects: { sanity: -8, uptime: -4 } },
      { label: 'Add "TODO: fix later" and walk away again', result: 'The TODO comment is now, technically, older than some of your newer coworkers.', effects: { sanity: 5, reputation: -6 } },
    ],
  },
  {
    id: 'nemesis-migration-3',
    minRank: 3,
    maxRank: 5,
    tag: 'nemesis',
    requiresFlag: 'migration_escalated',
    setFlag: 'migration_resolved',
    log: 'Auditors ask about "DB Migration — Q1." It is, astonishingly, still open. It has outlasted two CTOs, one acquisition, and a company-wide rebrand.',
    choices: [
      { label: 'Kill it in front of everyone, publicly, in the all-hands', result: 'You close the ticket live on screen-share. The room applauds. You will never top this professional high, and you have made peace with that.', effects: { sanity: 12, reputation: 15, karma: 5 } },
      { label: 'Quietly mark it "done" without actually finishing it', result: 'The lie holds for exactly one more audit cycle. You know this. You do it anyway, because you are, at heart, a survivor.', effects: { sanity: 6, reputation: -10, karma: -8 } },
      { label: 'Frame the original ticket and hang it on your wall', result: 'It is, at this point, a load-bearing piece of company history. Removing it now would be a war crime.', effects: { sanity: 4, karma: 6 } },
    ],
  },
]
