<template>
    <tr class="row" v-if="show">
        <td v-for="column in columns">
            {{ entity[column] }}
        </td>
        <td>
            <a v-bind:href="'/factories/edit/' + entity.id">
                <button type="button" class="btn btn-outline-primary"><span data-feather="edit"></span> Edit</button>
            </a>
            <button type="button" class="btn btn-outline-danger">Delete</button>
        </td>
    </tr>
</template>
<script>
export default {
    name: 'row',
    data: function() {
        return {
            show: true
        }
    },
    props: {
        entity: {
            type: Object,
            required: true
        },
        filters: {
            type: Object,
            required: true
        },
        columns: {
            type: Array,
            required: true
        },
    },
    created: function () {
        this.checkFilters();
    },
    watch: {
        filters: function (val) {
            this.checkFilters();
        }
    },
    methods: {
        checkFilters() {
            let _this = this;
            let _filters = Object.keys(this.filters);

            let count = 0;
            let total = 0;
            let filtered = false;
            let hide = false;

            Object.keys(this.filters).forEach((key) => {
                if (_this.filters[key] === '') {
                    hide = true;
                    return true;
                }

                total += 1;
                filtered = true;
                if (_this.filters[key] === _this.entity[key]) {
                    count++;
                    console.log(key, 'match', count);
                    return true;
                }

                hide = true;
            });

            if (filtered === false) {
                this.show = true;
                return true;
            }

            if (count === total) {
                this.show = true;
                return true;
            }

            this.show = false;
            return true;
        }
    },
}
</script>
