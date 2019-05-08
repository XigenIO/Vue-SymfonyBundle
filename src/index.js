import SymfonyTableFilter from "./components/table/filter.vue";
import SymfonyTableRow from "./components/table/row.vue";
import SymfonyTableTable from "./components/table/table.vue";

export default {
  install(Vue, options) {
    Vue.component("symfonyTable-filter", SymfonyTableFilter);
    Vue.component("symfonyTable-row", SymfonyTableRow);
    Vue.component("symfonyTable-table", SymfonyTableTable);
 }
};