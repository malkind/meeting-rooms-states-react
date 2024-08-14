export interface Config {
  id: string;
  initialState: string;
  states: State;
  // data?: object;
}

export interface State {
  [stateName: string]: {
    onEnter?: Function;
    onExit?: Function;
    // asyncOperation?: AsyncOperation;
    transitions: Transitions;
  };
}

export interface Transitions {
  [event: string]: {
    nextState: string;
  };
}

export interface Actions {
  onEnter: Function;
  onExit: Function;
}

export interface AsyncOperation {
  name: string;
  onDone: Function;
  onError: Function;
}
