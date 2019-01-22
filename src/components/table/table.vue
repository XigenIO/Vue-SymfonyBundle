<template>
    <table class="table">
        <thead>
            <tr>
                <th v-for="column in columns" scope="col">
                    {{ column | capitalize }}
                    <filter v-bind:entity="entity" v-bind:attribute="column" v-bind:filters="filters" v-on:updatefilter="filters = $event"></filter>
                </th>
                <th> </th>
            </tr>
        </thead>
        <tbody v-for="entity in entities">
            <row v-bind:columns="columns" v-bind:entity="entity" v-bind:filters="filters"></row>
        </tbody>
    </table>
</template>
<script>
import filter from './filter.vue'
import row from './row.vue'

export default {
    name: 'table',
    data: function() {
        return {
            entities: {},
            filters: {}
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
    },
    filters: {
        capitalize: function (value) {
            if (!value) return ''
            value = value.toString()
            return value.charAt(0).toUpperCase() + value.slice(1)
        }
    },
    methods: {
        fetchEntities() {
            let _this = this;

            fetch('/vue/entity-table/' + this.entity, {
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
        filter,
        row
    }
}
</script>
