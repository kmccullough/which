import Route from '@ember/routing/route';

import { inject } from '@ember/service';

export default class ChoiceRoute extends Route {

  @inject turn;

  model({ id: index }) {
    return {
      index,
      turns: this.turn.turns,
      turn: this.turn.turns.content[index],
      onChoose: () => {
        this.turn.choose(index);
      },
      onDelete: () => {
        this.transitionTo('index');
        this.turn.remove(index);
      },
    };
  }

}
