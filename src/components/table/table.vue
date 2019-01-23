<template>
    <div class="symfonyTable table-container">
        <p>{{ visableEntities }} of {{ totalEntities }} visible</p>
        <table class="table">
            <thead>
                <tr>
                    <th v-for="column in columns" scope="col" class="table-col-title">
                        <symfonyTable-filter v-bind:entity="entity" v-bind:attribute="column" v-bind:filters="filters" v-on:updatefilter="filters = $event"></symfonyTable-filter> {{ column | capitalize }}
                    </th>
                    <th width="125"> </th>
                </tr>
            </thead>
            <tbody>
                <symfonyTable-row v-bind:columns="columns" v-bind:entity="entity" v-bind:filters="filters" v-for="entity in entities" :key="entity.id"></symfonyTable-row>
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
            entities: {},
            visableEntities: 0,
            filters: {},
            filtersVisable: false
        }
    },
    props: {
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
        totalEntities: function () {
            return this.entities.length;
        },
    },
    watch: {
        filters: function () {
            this.updateVisableCount();
        }
    },
    methods: {
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

            fetch('/vue/table/' + this.entity, {
                method: 'get',
                credentials: 'same-origin',
            }).then(function(response) {
                return response.json()
            }).then(function(json) {
                _this.entities = json;
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
