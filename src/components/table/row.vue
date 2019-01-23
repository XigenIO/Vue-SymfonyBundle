<template>
    <tr class="table-row" v-if="show">
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
    name: 'table-row',
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
        checkRowFilters() {

        },
        checkFilters() {
            let _filters = Object.keys(this.filters);
            let count = 0;
            let total = 0;
            let filtered = false;

            _filters.forEach((attribute) => {
                let filter = this.filters[attribute];
                let entityValue = this.entity[attribute];
                if (filter === '') {
                    return true;
                }

                if (filter.length === 0) {
                    return true;
                }

                total++;
                filtered = true;

                let found = filter.find(function(filterValue) {
                    return filterValue === entityValue;
                });

                if (typeof found !== "undefined") {
                    count++;
                    console.log(attribute, 'match', count);
                    return true;
                }
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

            /*
            Object.keys(this.filters).forEach((key) => {
                let filter = _this.filters[key];
                console.log(filter);
                if (key === '') {
                    return true;
                }

                Object.keys(filter).forEach((key) => {
                    total += 1;
                    filtered = true;
                    if (filter[key] === _this.entity[key]) {
                        count++;
                        console.log(value, 'match', count);
                        return truekey
                    }
                });
            });
            */
        }
    },
}
</script>
