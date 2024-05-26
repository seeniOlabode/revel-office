import { ref } from "vue";

class StateMachine {
  constructor({
    initialState,
    transitions,
    beforeTransition,
    afterTransition,
  }) {
    this.state = ref(initialState);
    this.transitions = transitions;
    this.beforeTransition = beforeTransition;
    this.afterTransition = afterTransition;
  }

  getStateRef() {
    return this.state;
  }

  transition(event) {
    const currentState = this.state.value;
    const nextState = this.transitions?.[this.state.value]?.[event];
    if (nextState) {
      this.runHook("beforeTransition", currentState, nextState);
      this.state.value = nextState;
      this.runHook("afterTransition", currentState, nextState);
      console.log(`Transitioned from ${currentState} to ${nextState}`);
    } else {
      console.log(
        `No transition available from state ${this.state.value} on event ${event}`
      );
    }
  }

  runHook(hookType, currentState, nextState) {
    if (this[hookType]) {
      this[hookType]({ currentState, nextState });
    }

    const stateHook = this.transitions[currentState]?.[hookType];
    if (stateHook) {
      stateHook({ currentState, nextState });
    }
  }
}

export default StateMachine;
