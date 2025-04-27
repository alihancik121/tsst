import { library, config } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import {
  faTriangleExclamation,
  faCircleQuestion,
  faFileArrowUp,
  faRotate,
  faCircleStop,
  faDownload,
  faMoon,
  faSun,
  faCircleXmark,
  faCheckCircle,
} from '@fortawesome/free-solid-svg-icons';
import { faDiscord, faGithub } from '@fortawesome/free-brands-svg-icons';

config.autoAddCss = false;

library.add(
  faTriangleExclamation,
  faCircleQuestion,
  faCheckCircle,
  faFileArrowUp,
  faRotate,
  faCircleStop,
  faDownload,
  faDiscord,
  faGithub,
  faMoon,
  faSun,
  faCircleXmark
);

export default defineNuxtPlugin(({ vueApp }) => {
  vueApp.component('FontAwesomeIcon', FontAwesomeIcon);
});
