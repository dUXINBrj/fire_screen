import Vue from 'vue';

const focus = Vue.directive('focus', {
  componentUpdated: (el, {value}) => {
    if (value) {
      el.focus();
    }
  }
});

export { focus };
