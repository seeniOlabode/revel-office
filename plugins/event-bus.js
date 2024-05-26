import mitt from "mitt";

export const emitter = mitt();

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.provide("bus", emitter);

  return emitter;
});
