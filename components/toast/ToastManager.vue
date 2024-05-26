<template>
  <Teleport to="body">
    <TransitionGroup
      name="toast"
      tag="ul"
      class="site-toasts"
      @mouseenter="() => handleToastEvents('mouseenter')"
      @mouseleave="() => handleToastEvents('mouseleave')"
    >
      <Toast
        :id="`toast-${toast.id}`"
        :style="{ '--toasts-before': toasts.length - 1 - i }"
        v-for="(toast, i) in toasts"
        :toast="toast"
        :key="toast.id"
      />
    </TransitionGroup>
  </Teleport>
</template>

<script>
import { ref } from "vue";
import Toast from "./Toast.vue";

import StateMachine from "~/utils/StateMachine";

export default {
  components: {
    Toast,
  },
  setup() {
    const toastDuration = 5000;
    const toasts = ref([]);
    let toastCreationTimeout = null;

    function limitToasts() {
      if (toasts.value.length > 2) {
        toasts.value.shift();
      }
    }

    function clearAllTimeouts() {
      toasts.value.forEach((toast) => {
        clearTimeout(toast?.timeout);
      });
    }

    function removeToast(id) {
      const leavingToast = select(`#toast-${id}`);
      if (!leavingToast) return;
      leavingToast.dataset.timeup = "true";

      leavingToast.style.setProperty(
        "--leaving-scale",
        getCssVariable(leavingToast, "scale")
      );
      toasts.value.shift();
      if (toasts.value.length === 0) {
        handleToastEvents("finished");
      }
    }

    function removeToastLater(id, index, duration = toastDuration) {
      const timeout = setTimeout(() => {
        removeToast(id);
      }, duration);
      toasts.value[index].timeout = timeout;
    }

    function removeAllToastsLater() {
      toasts.value.forEach((toast, i) => {
        removeToastLater(toast.id, i, (i + 1) * 500 + toastDuration);
      });
    }

    function addToast({ title, description }) {
      const toastId = Date.now();
      limitToasts();
      toasts.value.push({ title, description, id: toastId });
      const index = toasts.value.length - 1;
      removeToastLater(toastId, index);
      handleToastEvents("toast");
    }

    function debouncedAddToast(newToast) {
      if (toastCreationTimeout) clearTimeout(toastCreationTimeout);
      toastCreationTimeout = setTimeout(() => {
        addToast(newToast);
      }, 100);
    }

    function beforeTransition({ currentState, nextState }) {
      if (nextState === "expanded") {
        clearAllTimeouts();
      } else if (currentState === "expanded") {
        removeAllToastsLater();
      }
    }

    const toastTransitions = {
      expanded: {
        mouseleave: "displaying",
      },
      displaying: {
        mouseenter: "expanded",
        finished: "idle",
        toast: "displaying",
      },
      idle: {
        toast: "displaying",
      },
    };

    const toastStateMachine = new StateMachine({
      initialState: "idle",
      transitions: toastTransitions,
      beforeTransition,
    });

    function handleToastEvents(event) {
      toastStateMachine.transition(event);
    }

    return {
      toasts,
      ref,
      debouncedAddToast,
      handleToastEvents,
    };
  },
  watch: {
    toasts: {
      handler(value) {
        const allToasts = Array.from(selectAll(".toast"));
        this.allToastEls = allToasts;

        let lastCumulativeHeightGap = 5;
        let length = allToasts.length;
        let startingIndex = length - 1;

        for (let i = startingIndex; i >= 0; i--) {
          const currentToast = allToasts[i];
          currentToast.style.setProperty(
            "--offset",
            `${lastCumulativeHeightGap * -1}px`
          );
          lastCumulativeHeightGap += currentToast.clientHeight + 10;
        }
      },
      deep: true,
      flush: "post",
    },
  },
  mounted() {
    this.$bus.on("toast", this.debouncedAddToast);
  },
};
</script>

<style lang="pcss" scoped>
@import "~/styles/index.pcss";

.site-toasts {
  position: fixed;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  justify-content: end;
  align-items: flex-end;
  position: fixed;
  z-index: 10;
  list-style: none;
  padding: 0;
  padding: var(--sm-spacing);
  --gap: 10px;
  gap: var(--gap);
  pointer-events: none;
}

:deep(.toast) {
  background-color: white;
  width: 350px;
  padding: 16px;
  border: solid 1px var(--stroke);
  border-radius: var(--sm-radius);
  font-size: var(--sm-font);
  display: flex;
  flex-direction: column;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  position: absolute;
  transition: transform var(--sm-speed);
  --lift-amount: -10px;
  --scale: 1 - var(--toasts-before) * 0.05;
  --y-transform: translateY(calc(var(--lift-amount) * var(--toasts-before)))
    scale(calc(var(--scale)));
  transform: var(--y-transform);
  pointer-events: all;
  user-select: none;
}

/* :deep(.toast):hover {
  cursor: grab;
}

:deep(.toast):active {
  cursor: grabbing;
} */

:deep(.toast)::before {
  content: "";
  position: absolute;
  top: calc(var(--gap) * -1);
  height: var(--gap);
  left: 0;
  right: 0;
  cursor: default;
}

:deep(.toast) .toast__title {
  font-weight: 500;
  line-height: 1.5;
  color: var(--text-grey);
  transform: translateY(0);
  opacity: 1;
}

:deep(.toast) .toast__description {
  font-weight: 400;
  line-height: 1.4;
  color: var(--grey);
}

:deep(.toast) span {
  display: block;
}

:deep(.toast) .toast__button {
  margin-top: var(--gap);
  width: fit-content;
  bottom: 16px;
  left: 16px;
  border-radius: 5px !important;
}

.toast-leave-active {
  z-index: -1;
}

.toast-enter-from {
  transform: translateY(50%);
  opacity: 0;
}

.toast-leave-to {
  --lift-amount: -10px;
  --scale: 1 - 3 * 0.05;
  --y-transform: translateY(calc(var(--lift-amount) * 3))
    scale(calc(var(--scale)));
  transform: var(--y-transform);
  opacity: 0.3;
}

:deep(.toast).toast-leave-active[data-timeup] {
  --lift-amount: 10px;
  --scale: var(--leaving-scale);
}

.site-toasts:hover :deep(.toast) {
  --scale: 1;
  transform: translateY(var(--offset)) scale(var(--scale));
}
</style>