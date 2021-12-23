import Service from '@ember/service';

import { A } from '@ember/array';
import { inject } from '@ember/service';
import { storageFor } from 'ember-local-storage';

// Number of additional option rounds to log (can be 0; last choice is always tracked)
const maxLogRounds = 2;

export default class ChoiceService extends Service {

  @inject routeModel;
  @storageFor('turns') choices;

  createChoice(choice) {
    const { name, options, algorithm, spread } = choice || {};
    return {
      name:      name || '',
      options:   A(options || []),
      algorithm: algorithm || 'shuffle',
      spread:    spread || 0,
    };
  }

  // Add new choice
  add(choice) {
    this.choices.pushObject(this.createChoice(choice));
    this.routeModel.refresh('choice');
  }

  // Remove choice at given index
  remove(index) {
    this.choices.removeAt(index);
  }

  update(index, choice) {
    this.choices.replaceContent(index, 1, [ {
      ...this.choices.objectAt(index), ...choice
    } ]);
    this.routeModel.refresh('choice');
  }

  // Choose next chosen option for choice at given index
  choose(index) {
    const choice = this.choices.objectAt(index);
    if (!choice) {
      return;
    }
    let { log = [], options = [], algorithm, spread } = choice;
    if (!options.length) {
      return;
    }
    spread = Math.floor(Math.max(0, Math.min(180, spread || 0)) / 181 * options.length);
    let choices = options.map((o, i) => i);
    let blacklist = [];
    const recent = log.slice(log.length - options.length);
    // Blacklist options within latest shuffle round
    if (algorithm === 'shuffle') {
      blacklist = log.slice(log.length - log.length % options.length);
    }
    // Remove blacklisted choices...
    choices = choices.filter(i => !blacklist.includes(i)
      // Remove recent choices excluded by spread
      && (!recent.includes(i) || recent.indexOf(i) < recent.length - spread)
    );
    // Filter to uniques
    choices = Array.from(new Set(choices));
    // Choose at random
    const choiceIndex = choices[Math.floor(Math.random() * choices.length)];
    // Log and store given choice
    log.push(choiceIndex);
    choice.choice = choiceIndex;
    // Truncate logs
    choice.log = log.slice(Math.max(0, log.length - (
      // Minimum choices to track
      log.length % options.length
        // Additional rounds to store
        + options.length * Math.max(0, maxLogRounds)
    )));
    // Store choice object mutations
    this.choices.replaceContent(index, 1, [ choice ]);
  }

}
