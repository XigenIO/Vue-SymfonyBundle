<template>
    <select class="filter" v-model="selectedValue">
        <option v-for="value in values">
            {{ value }}
        </option>
    </select>
</template>
<script>
export default {
    name: 'filter',
    data: function() {
        return {
            values: [],
            selectedValue: '',
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
    created: function () {
        this.fetchEntityAttributesValues();
    },
    watch: {
        selectedValue: function (val) {
            var filter = {};
            filter[this.attribute] = val;

            delete this.filters[this.attribute];
            let merged = {...filter, ...this.filters};

            window.merged = merged;
            this.$nextTick(()=>{
                let _this = this;
                requestAnimationFrame(()=>{
                  requestAnimationFrame(()=>{
                    _this.$emit('updatefilter', window.merged);
                  })
                })
            });

        }
    },
    methods: {
        fetchEntityAttributesValues() {
            let _this = this;

            fetch('/vue/entity-filter/' + this.entity + '/' + this.attribute , {
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
