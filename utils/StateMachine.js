import { ref } from "vue";

class StateMachine {
  constructor({ initialState, transitions, _before, _after }) {
    this.state = ref(initialState);
    this.transitions = transitions;
    this._before = _before;
    this._after = _after;
  }

  getStateRef() {
    return this.state;
  }

  transition(event) {
    const nextState = this.transitions[this.state.value]?.[event];
    if (nextState) {
      this.runActionsBefore(this.state.value, nextState);
      this.state.value = nextState;
      this.runActionsAfter(this.state.value, nextState);
      console.log(`Transitioned to ${this.state.value}`);
    } else {
      console.log(
        `No transition available from state ${this.state.value} on event ${event}`
      );
    }
  }

  runActionsBefore(currentState, nextState) {
    if (this._before) {
      this._before({ currentState, nextState });
    }
    if (this.transitions[currentState]?._before) {
      this.transitions[currentState]._before({
        currentState,
        nextState,
      });
    }
  }

  runActionsAfter(currentState, nextState) {
    if (this._after) {
      this._after({ currentState, nextState });
    }
    if (this.transitions[currentState]?._after) {
      this.transitions[currentState]._after({ currentState, nextState });
    }
  }
}

export default StateMachine;
