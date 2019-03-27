<template>
    <tr class="table-row" v-if="show">
        <td>
            <span v-if="entity['_html_']" v-html="entity['_html_']"></span>
            <span v-else>
                <a v-bind:href="this.url + '/edit/' + entity.id">
                    <button type="button" class="btn btn-outline-primary btn-edit">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-edit"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
                    </button>
                </a>
            </span>
        </td>
        <td v-for="column in columns">
            <span v-html="entity[column]"></span>
        </td>
    </tr>
</template>
<script>
    export default {
        name: 'table-row',
        data: function() {
            return {
                show: true,
                url: document.URL
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
