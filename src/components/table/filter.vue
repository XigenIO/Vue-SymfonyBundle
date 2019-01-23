<template>
    <span class="filter filter-container">
        <span class="filter-icons">
            <button type="button" @click='toggle()' v-bind:class="[filterButtonClass, { 'filter-visable': filtersVisable, 'filter-active-colour': isActive, }]">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon-svg feather feather-filter"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon></svg>
            </button>
        </span>
        <div class="filter-body" v-show="filtersVisable">
            <form class="form-inline">
                <select v-model="selectedValue" multiple class="form-control mb-2 mr-sm-2">
                    <option class="js-ignore-click" v-for="value in values">
                        {{ value }}
                    </option>
                </select>
            </form>

            <div class="filter-controls-container">
                <div class="filter-controls">
                    <button type="button" @click='sort()' class="btn btn-light btn-sm">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon-svg feather feather-arrow-up"><line x1="12" y1="19" x2="12" y2="5"></line><polyline points="5 12 12 5 19 12"></polyline></svg>
                    </button>

                    <button type="button" @click='sortReverse()' class="btn btn-light btn-sm">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon-svg feather feather-arrow-down"><line x1="12" y1="5" x2="12" y2="19"></line><polyline points="19 12 12 19 5 12"></polyline></svg>
                    </button>

                    <button type="button" @click='clear()' class="btn btn-danger btn-sm">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon-svg feather feather-minus-square"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="8" y1="12" x2="16" y2="12"></line></svg>
                    </button>
                </div>
            </div>
        </div>
    </span>
</template>
<script>

export default {
    name: 'table-filter',
    data: function() {
        return {
            filterButtonClass: 'btn btn-sm btn-light js-ignore-click',
            filtersVisable: false,
            selectedValue: [],
            values: []
        }
    },
    props: {
        entity: null,
        attribute: null,
        filters: {
          type: Object,
          required: true
        },
    },
    computed: {
        isActive: function () {
            return this.selectedValue.length > 0;
        },
    },
    created: function () {
        this.fetchEntityAttributesValues();
    },
    watch: {
        selectedValue: function (val) {
            var filter = {};
            filter[this.attribute] = val;

            delete this.filters[this.attribute];
            let merged = {...filter, ...this.filters};

            this.$nextTick(() => {
                let _this = this;
                requestAnimationFrame(() => {
                    _this.$emit('updatefilter', merged);
                })
            });

        }
    },
    methods: {
        toggle: function() {
            this.filtersVisable = !this.filtersVisable;
        },
        clear: function(){
            var filter = {};
            this.selectedValue = [];

            filter[this.attribute] = '';

            delete this.filters[this.attribute];
            let merged = {...filter, ...this.filters};
            this.$nextTick(() => {
                let _this = this;
                requestAnimationFrame(() => {
                  requestAnimationFrame(() => {
                    _this.$emit('updatefilter', merged);
                  })
                })
            });
        },
        sort: function () {

        },
        sortReverse: function () {

        },
        fetchEntityAttributesValues() {
            let _this = this;

            fetch('/vue/table/filter/' + this.entity + '/' + this.attribute , {
                method: 'get',
                credentials: 'same-origin',
            }).then(function(response) {
                return response.json()
            }).then(function(json) {
                _this.values = json;
            }).catch(function(ex) {
                console.log('parsing failed', ex)
            })
        }
    }
}
</script>
