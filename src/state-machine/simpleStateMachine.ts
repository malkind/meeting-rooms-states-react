import { Config } from "./simpleState.interface";

export class Machine {
  private config: Config;
  private state: string;

  constructor(config: Config) {
    this.config = config;
    this.state = config.initialState;
    this._setInitialState();
  }

  transition(event: string) {
    this._transition(event);
  }

  getState() {
    return this.state;
  }

  private _setInitialState() {
    const currentState = this.config.states[this.state];
    if (!currentState) {
      // case of initial state not existing
      throw new Error(`Current state ${this.state} is not defined.`);
    }

    currentState.onEnter && currentState.onEnter();
  }

  private _transition(event: string) {
    const currentState = this.config.states[this.state];

    if (!currentState) {
      // case of initial state not existing
      throw new Error(`Current state ${this.state} is not defined.`);
    }
    const transitions = currentState.transitions;
    const transition = transitions[event];

    if (!transition) {
      // ingoring events that don't exist on state
      return;
    }

    if (currentState.onExit) {
      currentState.onExit();
    }
    const nextState = this.config.states[transition.nextState];
    if (currentState.onExit) {
      currentState.onExit();
    }

    if (nextState.onEnter) {
      nextState.onEnter();
    }

    this.state = transition.nextState;
  }
}
