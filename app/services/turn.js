import Service from '@ember/service';

import { storageFor } from 'ember-local-storage';

// Number of additional option rounds to log (can be 0; last choice is always tracked)
const maxLogRounds = 2;

export default class TurnService extends Service {

  @storageFor('turns') turns;

  // Add new choice
  add(choice) {
    const { name, options } = choice;
    this.turns.pushObject({ name, options: [ ...options ] });
  }

  // Remove choice at given index
  remove(index) {
    this.turns.removeAt(index);
  }

  update(index, turn) {
    this.turns.replaceContent(index, 1, [ turn ]);
  }

  // Choose next chosen option for choice at given index
  choose(index) {
    const turn = this.turns.objectAt(index);
    if (!turn) {
      return;
    }
    let { log = [], options = [] } = turn;
    if (!options.length) {
      return;
    }
    const chosen = log.slice(log.length - log.length % options.length);
    const choices = options.map((o, i) => i).filter(i => !chosen.includes(i));
    const choice = choices[Math.floor(Math.random() * choices.length)];
    log.push(choice);
    turn.log = log.slice(Math.max(0, log.length - (
      // Minimum choices to track
      log.length % options.length
        // Additional rounds to store
        + options.length * Math.max(0, maxLogRounds)
    )));
    // Always store last choice regardless of maxLogRounds
    turn.choice = choice;
    // Store turn object mutations
    this.turns.replaceContent(index, 1, [ turn ]);
  }

}
