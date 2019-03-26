<template>
    <div class="symfonyTable table-container">
        <!--div class="sort-reset-button">
            <button type="button" @click='clear()' class="btn btn-outline-danger btn-sm js-ignore-click">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon-svg feather feather-minus-square js-ignore-click"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="8" y1="12" x2="16" y2="12"></line></svg>
            </button>
        </div-->

        <table class="table">
            <thead>
                <tr>
                    <th class="table-row-buttons"> </th>
                    <th v-for="column in columnsArray" scope="col" class="table-col-title">
                        <symfonyTable-filter v-if="column !== 'flags'"
                            v-bind:attribute="column"
                            v-bind:entities="entities"
                            v-bind:entity="entity"
                            v-bind:filters="filters"
                            v-on:updatefilter="filters = $event"
                            v-on:updatesort="entities = $event"
                        >
                        </symfonyTable-filter> {{ column | capitalize }}
                    </th>
                </tr>
            </thead>
            <tbody>
                <symfonyTable-row v-bind:columns="columnsArray" v-bind:entity="entity" v-bind:filters="filters" v-for="entity in entities" :key="entity.id"></symfonyTable-row>
            </tbody>
        </table>
    </div>
</template>
<script>
import filter from './filter.vue'
import row from './row.vue'

export default {
    name: 'symfonyTable',
    data: function() {
        return {
            entities: [],
            entitiesOriginal: [],
            visableEntities: 0,
            filters: {},
            filtersVisable: false
        }
    },
    props: {
        endpoint: {
          type: String,
          required: false
        },
        entity: {
          required: true
        },
        columns: {
          type: Array,
          required: true
        },
    },
    created: function () {
        this.fetchEntities();
        this.updateVisableCount();
    },
    mounted() {
        document.addEventListener('click', function (e) {
            if (true === e.target.classList.contains('btn')) {
                return true;
            }

            if (true === e.target.classList.contains('icon-svg')) {
                return true;
            }

            if (true === e.target.classList.contains('js-ignore-click')) {
                return true;
            }

            document.querySelectorAll('.filter-visable').forEach((filter) => {
                filter.click();
            });
        });
    },
    filters: {
        capitalize: function (value) {
            if (!value) return ''
            value = value.toString()
            return value.charAt(0).toUpperCase() + value.slice(1)
        }
    },
    computed: {
        fetchUrl: function () {
            if (typeof this.endpoint != "undefined") {
                return this.endpoint;
            }

            return '/vue/table/' + this.entity + '/' + this.columnsArray.join('-')
        },
        totalEntities: function () {
            return this.entities.length;
        },
        columnsArray: function () {
            let columns = [];
            this.columns.forEach((column) => {
                columns.push(column);
            });

            return columns;
        },
        attributeString: function () {
            return this.columnsArray.join('-');
        }
    },
    watch: {
        filters: function () {
            this.updateVisableCount();
        }
    },
    methods: {
        clear() {
            this.$nextTick(() => {
                let _this = this;
                requestAnimationFrame(() => {
                    document.querySelectorAll('.btn-close-filter').forEach((filter) => {
                        filter.click();
                    });
                    document.querySelectorAll('.filter-visable').forEach((filter) => {
                        filter.click();
                    });
                    _this.entities = _this.entitiesOriginal;
                    _this.filters = {};
                })
            });

        },
        updateVisableCount() {
            let count = this.entities.length;
            if (typeof this.$refs.rows !== "undefined") {
                count = this.$refs.rows.childElementCount;
            }

            this.visableEntities = count;
            return true;
        },
        fetchEntities() {
            let _this = this;
            fetch(this.fetchUrl, {
                method: 'get',
                credentials: 'same-origin',
            }).then(function(response) {
                return response.json()
            }).then(function(json) {
                _this.entities = json;
                _this.entitiesOriginal = json;
            }).catch(function(ex) {
                console.log('parsing failed', ex)
            })
        }
    },
    components: {
        'symfonyTable-filter': filter,
        'symfonyTable-row': row
    }
}
</script>
