import { Config } from "./simpleState.interface";
import { Machine } from "./simpleStateMachine";

class NoErrorThrownError extends Error {}
const config: Config = {
  id: "my-id",
  initialState: "non-existing-state",
  states: {
    state1: {
      transitions: {
        "on-event": {
          nextState: "state2",
        },
      },
    },
  },
};

const config2: Config = {
  id: "my-id2",
  initialState: "a",
  states: {
    a: {
      transitions: {
        a1: {
          nextState: "b",
        },
        a2: {
          nextState: "c",
        },
      },
    },
    b: {
      transitions: {
        b1: {
          nextState: "a",
        },
        b2: {
          nextState: "c",
        },
      },
    },
    c: {
      transitions: {
        c1: {
          nextState: "a",
        },
        c2: {
          nextState: "b",
        },
      },
    },
  },
};

const getError = async <TError>(call: () => unknown): Promise<TError> => {
  try {
    await call();

    throw new NoErrorThrownError();
  } catch (error: unknown) {
    return error as TError;
  }
};

describe("State Machine", () => {
  it("should throw exception as initial state was not found", async () => {
    const error = await getError(() => {
      const machine = new Machine(config);
      // machine.transition("some-event");
    });
    expect(error).not.toBeInstanceOf(NoErrorThrownError);
    expect(error).toHaveProperty(
      "message",
      "Current state non-existing-state is not defined."
    );
  });
  it("should create machine and transition", () => {
    const machine = new Machine(config2);
    machine.transition("a1");
    expect(machine.getState()).toEqual("b");
  });
  it("should transition multiple times", () => {
    const machine = new Machine(config2);
    machine.transition("a1");
    machine.transition("b2");
    expect(machine.getState()).toEqual("c");
  });
  it("should ignore last transition as it doesn't exist", () => {
    const machine = new Machine(config2);
    machine.transition("a1");
    machine.transition("b2");
    machine.transition("some-transition");
    expect(machine.getState()).toEqual("c");
  });
  it("should make last transition after non-existant", () => {
    const machine = new Machine(config2);
    machine.transition("a1");
    machine.transition("b2");
    machine.transition("some-transition");
    machine.transition("c1");
    expect(machine.getState()).toEqual("a");
  });
});
