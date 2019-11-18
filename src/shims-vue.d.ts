declare module '*.vue' {
  import Vue from 'vue';
  export default Vue;
}

declare module "*/getSubmenuData.js"{
  export function myFunction(): void;
}