//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//


var script = {
    name: 'table-filter',
    data: function() {
        return {
            filterButtonClass: 'btn btn-sm btn-light js-ignore-click',
            filtersVisable: false,
            isSorting: false,
            selectedValue: [],
            values: [],
            valuesOriginal: [],
            search: ''
        }
    },
    props: {
        entity: null,
        attribute: null,
        filters: {
          type: Object,
          required: true
        },
        entities: {
          type: Array,
          required: true
        },
    },
    computed: {
        isActive: function () {
            // if (this.selectedValue.length > 0) {
            //     return true;
            // }
            //
            // if (true === this.isSorting) {
            //     return true;
            // }

            return false;
        },
        availableFilterValues: function () {
            // return this.values;

            if( this.search === '' ){
                return this.valuesOriginal;
            }

            let _this = this;

            return this.values.filter(function(value){
                return value.toLowerCase().indexOf(_this.search.toLowerCase())>=0;
            });
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
                });
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
                  });
                });
            });
        },
        sort: function () {
            let _this = this;
            this.entities.sort(function(a, b) {
                if (a[_this.attribute] < b[_this.attribute]) {
                    return -1;
                }

                if (a[_this.attribute] > b[_this.attribute]) {
                    return 1;
                }

                return 0;
            });

            this.$nextTick(() => {
                requestAnimationFrame(() => {
                    _this.$emit('updatesort', _this.entities);
                });
            });
            this.isSorting = true;
        },
        sortReverse: function () {
            let _this = this;
            this.entities.sort(function(a, b) {
                if (a[_this.attribute] > b[_this.attribute]) {
                    return -1;
                }

                if (a[_this.attribute] < b[_this.attribute]) {
                    return 1;
                }

                return 0;
            });

            this.$nextTick(() => {
                requestAnimationFrame(() => {
                    _this.$emit('updatesort', _this.entities);
                });
            });
            this.isSorting = true;
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
                _this.valuesOriginal = json;
            }).catch(function(ex) {
                console.log('parsing failed', ex);
            });
        },
    }
};

function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier
/* server only */
, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
  if (typeof shadowMode !== 'boolean') {
    createInjectorSSR = createInjector;
    createInjector = shadowMode;
    shadowMode = false;
  } // Vue.extend constructor export interop.


  var options = typeof script === 'function' ? script.options : script; // render functions

  if (template && template.render) {
    options.render = template.render;
    options.staticRenderFns = template.staticRenderFns;
    options._compiled = true; // functional template

    if (isFunctionalTemplate) {
      options.functional = true;
    }
  } // scopedId


  if (scopeId) {
    options._scopeId = scopeId;
  }

  var hook;

  if (moduleIdentifier) {
    // server build
    hook = function hook(context) {
      // 2.3 injection
      context = context || // cached call
      this.$vnode && this.$vnode.ssrContext || // stateful
      this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext; // functional
      // 2.2 with runInNewContext: true

      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__;
      } // inject component styles


      if (style) {
        style.call(this, createInjectorSSR(context));
      } // register component module identifier for async chunk inference


      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier);
      }
    }; // used by ssr in case component is cached and beforeCreate
    // never gets called


    options._ssrRegister = hook;
  } else if (style) {
    hook = shadowMode ? function () {
      style.call(this, createInjectorShadow(this.$root.$options.shadowRoot));
    } : function (context) {
      style.call(this, createInjector(context));
    };
  }

  if (hook) {
    if (options.functional) {
      // register for functional component in vue file
      var originalRender = options.render;

      options.render = function renderWithStyleInjection(h, context) {
        hook.call(context);
        return originalRender(h, context);
      };
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate;
      options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
    }
  }

  return script;
}

var normalizeComponent_1 = normalizeComponent;

/* script */
const __vue_script__ = script;

/* template */
var __vue_render__ = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c("span", { staticClass: "filter filter-container" }, [
    _c("span", { staticClass: "filter-icons" }, [
      _c(
        "button",
        {
          class: [
            _vm.filterButtonClass,
            {
              "filter-visable": _vm.filtersVisable,
              "filter-active-colour": _vm.isActive
            }
          ],
          attrs: { type: "button" },
          on: {
            click: function($event) {
              return _vm.toggle()
            }
          }
        },
        [
          _c(
            "svg",
            {
              staticClass: "icon-svg feather feather-filter",
              attrs: {
                xmlns: "http://www.w3.org/2000/svg",
                width: "24",
                height: "24",
                viewBox: "0 0 24 24",
                fill: "none",
                stroke: "currentColor",
                "stroke-width": "2",
                "stroke-linecap": "round",
                "stroke-linejoin": "round"
              }
            },
            [
              _c("polygon", {
                attrs: { points: "22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" }
              })
            ]
          )
        ]
      )
    ]),
    _vm._v(" "),
    _c(
      "div",
      {
        directives: [
          {
            name: "show",
            rawName: "v-show",
            value: _vm.filtersVisable,
            expression: "filtersVisable"
          }
        ],
        staticClass: "filter-body"
      },
      [
        _c(
          "div",
          { staticClass: "filter-controls-container js-ignore-click" },
          [
            _c("div", { staticClass: "filter-controls js-ignore-click" }, [
              _c("input", {
                directives: [
                  {
                    name: "model",
                    rawName: "v-model",
                    value: _vm.search,
                    expression: "search"
                  }
                ],
                staticClass: "filter-controls__name-filter js-ignore-click",
                attrs: {
                  type: "text",
                  placeholder: "Start typing...",
                  name: "name-filter"
                },
                domProps: { value: _vm.search },
                on: {
                  input: function($event) {
                    if ($event.target.composing) {
                      return
                    }
                    _vm.search = $event.target.value;
                  }
                }
              }),
              _vm._v(" "),
              _c(
                "button",
                {
                  staticClass:
                    "btn btn-danger btn-sm btn-close-filter js-ignore-click",
                  attrs: { type: "button" },
                  on: {
                    click: function($event) {
                      return _vm.clear()
                    }
                  }
                },
                [
                  _c(
                    "svg",
                    {
                      staticClass:
                        "icon-svg feather feather-minus-square js-ignore-click",
                      attrs: {
                        xmlns: "http://www.w3.org/2000/svg",
                        width: "24",
                        height: "24",
                        viewBox: "0 0 24 24",
                        fill: "none",
                        stroke: "currentColor",
                        "stroke-width": "2",
                        "stroke-linecap": "round",
                        "stroke-linejoin": "round"
                      }
                    },
                    [
                      _c("rect", {
                        attrs: {
                          x: "3",
                          y: "3",
                          width: "18",
                          height: "18",
                          rx: "2",
                          ry: "2"
                        }
                      }),
                      _c("line", {
                        attrs: { x1: "8", y1: "12", x2: "16", y2: "12" }
                      })
                    ]
                  )
                ]
              ),
              _vm._v(" "),
              _c(
                "button",
                {
                  staticClass: "btn btn-light btn-sm js-ignore-click",
                  attrs: { type: "button" },
                  on: {
                    click: function($event) {
                      return _vm.sortReverse()
                    }
                  }
                },
                [
                  _c(
                    "svg",
                    {
                      staticClass:
                        "icon-svg feather feather-arrow-down js-ignore-click",
                      attrs: {
                        xmlns: "http://www.w3.org/2000/svg",
                        width: "24",
                        height: "24",
                        viewBox: "0 0 24 24",
                        fill: "none",
                        stroke: "currentColor",
                        "stroke-width": "2",
                        "stroke-linecap": "round",
                        "stroke-linejoin": "round"
                      }
                    },
                    [
                      _c("line", {
                        attrs: { x1: "12", y1: "5", x2: "12", y2: "19" }
                      }),
                      _c("polyline", { attrs: { points: "19 12 12 19 5 12" } })
                    ]
                  )
                ]
              ),
              _vm._v(" "),
              _c(
                "button",
                {
                  staticClass: "btn btn-light btn-sm js-ignore-click",
                  attrs: { type: "button" },
                  on: {
                    click: function($event) {
                      return _vm.sort()
                    }
                  }
                },
                [
                  _c(
                    "svg",
                    {
                      staticClass:
                        "icon-svg feather feather-arrow-up js-ignore-click",
                      attrs: {
                        xmlns: "http://www.w3.org/2000/svg",
                        width: "24",
                        height: "24",
                        viewBox: "0 0 24 24",
                        fill: "none",
                        stroke: "currentColor",
                        "stroke-width": "2",
                        "stroke-linecap": "round",
                        "stroke-linejoin": "round"
                      }
                    },
                    [
                      _c("line", {
                        attrs: { x1: "12", y1: "19", x2: "12", y2: "5" }
                      }),
                      _c("polyline", { attrs: { points: "5 12 12 5 19 12" } })
                    ]
                  )
                ]
              )
            ])
          ]
        ),
        _vm._v(" "),
        _c("form", { staticClass: "form-inline" }, [
          _c(
            "select",
            {
              directives: [
                {
                  name: "model",
                  rawName: "v-model",
                  value: _vm.selectedValue,
                  expression: "selectedValue"
                }
              ],
              staticClass: "form-control mb-2 mr-sm-2",
              attrs: { multiple: "" },
              on: {
                change: function($event) {
                  var $$selectedVal = Array.prototype.filter
                    .call($event.target.options, function(o) {
                      return o.selected
                    })
                    .map(function(o) {
                      var val = "_value" in o ? o._value : o.value;
                      return val
                    });
                  _vm.selectedValue = $event.target.multiple
                    ? $$selectedVal
                    : $$selectedVal[0];
                }
              }
            },
            _vm._l(_vm.availableFilterValues, function(value) {
              return _c("option", { staticClass: "js-ignore-click" }, [
                _vm._v(
                  "\n                    " +
                    _vm._s(value) +
                    "\n                "
                )
              ])
            }),
            0
          )
        ])
      ]
    )
  ])
};
var __vue_staticRenderFns__ = [];
__vue_render__._withStripped = true;

  /* style */
  const __vue_inject_styles__ = undefined;
  /* scoped */
  const __vue_scope_id__ = undefined;
  /* module identifier */
  const __vue_module_identifier__ = undefined;
  /* functional template */
  const __vue_is_functional_template__ = false;
  /* style inject */
  
  /* style inject SSR */
  

  
  var SymfonyTableFilter = normalizeComponent_1(
    { render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ },
    __vue_inject_styles__,
    __vue_script__,
    __vue_scope_id__,
    __vue_is_functional_template__,
    __vue_module_identifier__,
    undefined,
    undefined
  );

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

var script$1 = {
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
};

/* script */
const __vue_script__$1 = script$1;

/* template */
var __vue_render__$1 = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _vm.show
    ? _c(
        "tr",
        { staticClass: "table-row" },
        [
          _c("td", [
            _vm.entity["_html_"]
              ? _c("span", {
                  domProps: { innerHTML: _vm._s(_vm.entity["_html_"]) }
                })
              : _c("span", [
                  _c(
                    "a",
                    { attrs: { href: this.url + "/edit/" + _vm.entity.id } },
                    [
                      _c(
                        "button",
                        {
                          staticClass: "btn btn-outline-primary btn-edit",
                          attrs: { type: "button" }
                        },
                        [
                          _c(
                            "svg",
                            {
                              staticClass: "feather feather-edit",
                              attrs: {
                                xmlns: "http://www.w3.org/2000/svg",
                                width: "24",
                                height: "24",
                                viewBox: "0 0 24 24",
                                fill: "none",
                                stroke: "currentColor",
                                "stroke-width": "2",
                                "stroke-linecap": "round",
                                "stroke-linejoin": "round"
                              }
                            },
                            [
                              _c("path", {
                                attrs: {
                                  d:
                                    "M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"
                                }
                              }),
                              _c("path", {
                                attrs: {
                                  d:
                                    "M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"
                                }
                              })
                            ]
                          )
                        ]
                      )
                    ]
                  )
                ])
          ]),
          _vm._v(" "),
          _vm._l(_vm.columns, function(column) {
            return _c("td", [
              _c("span", {
                domProps: { innerHTML: _vm._s(_vm.entity[column]) }
              })
            ])
          })
        ],
        2
      )
    : _vm._e()
};
var __vue_staticRenderFns__$1 = [];
__vue_render__$1._withStripped = true;

  /* style */
  const __vue_inject_styles__$1 = undefined;
  /* scoped */
  const __vue_scope_id__$1 = undefined;
  /* module identifier */
  const __vue_module_identifier__$1 = undefined;
  /* functional template */
  const __vue_is_functional_template__$1 = false;
  /* style inject */
  
  /* style inject SSR */
  

  
  var SymfonyTableRow = normalizeComponent_1(
    { render: __vue_render__$1, staticRenderFns: __vue_staticRenderFns__$1 },
    __vue_inject_styles__$1,
    __vue_script__$1,
    __vue_scope_id__$1,
    __vue_is_functional_template__$1,
    __vue_module_identifier__$1,
    undefined,
    undefined
  );

//

var script$2 = {
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
            value = value.toString();
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
                });
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
                console.log('parsing failed', ex);
            });
        }
    },
    components: {
        'symfonyTable-filter': SymfonyTableFilter,
        'symfonyTable-row': SymfonyTableRow
    }
};

/* script */
const __vue_script__$2 = script$2;

/* template */
var __vue_render__$2 = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c("div", { staticClass: "symfonyTable table-container" }, [
    _c("table", { staticClass: "table" }, [
      _c("thead", [
        _c(
          "tr",
          [
            _c("th", { staticClass: "table-row-buttons" }),
            _vm._v(" "),
            _vm._l(_vm.columnsArray, function(column) {
              return _c(
                "th",
                {
                  staticClass: "table-col-title",
                  class: ["table-col-" + column],
                  attrs: { scope: "col" }
                },
                [
                  column !== "flags"
                    ? _c("symfonyTable-filter", {
                        attrs: {
                          attribute: column,
                          entities: _vm.entities,
                          entity: _vm.entity,
                          filters: _vm.filters
                        },
                        on: {
                          updatefilter: function($event) {
                            _vm.filters = $event;
                          },
                          updatesort: function($event) {
                            _vm.entities = $event;
                          }
                        }
                      })
                    : _vm._e(),
                  _vm._v(
                    " " +
                      _vm._s(_vm._f("capitalize")(column)) +
                      "\n                "
                  )
                ],
                1
              )
            })
          ],
          2
        )
      ]),
      _vm._v(" "),
      _c(
        "tbody",
        _vm._l(_vm.entities, function(entity) {
          return _c("symfonyTable-row", {
            key: entity.id,
            attrs: {
              columns: _vm.columnsArray,
              entity: entity,
              filters: _vm.filters
            }
          })
        }),
        1
      )
    ])
  ])
};
var __vue_staticRenderFns__$2 = [];
__vue_render__$2._withStripped = true;

  /* style */
  const __vue_inject_styles__$2 = undefined;
  /* scoped */
  const __vue_scope_id__$2 = undefined;
  /* module identifier */
  const __vue_module_identifier__$2 = undefined;
  /* functional template */
  const __vue_is_functional_template__$2 = false;
  /* style inject */
  
  /* style inject SSR */
  

  
  var SymfonyTableTable = normalizeComponent_1(
    { render: __vue_render__$2, staticRenderFns: __vue_staticRenderFns__$2 },
    __vue_inject_styles__$2,
    __vue_script__$2,
    __vue_scope_id__$2,
    __vue_is_functional_template__$2,
    __vue_module_identifier__$2,
    undefined,
    undefined
  );

var index = {
  install(Vue, options) {
    Vue.component("symfonyTable-filter", SymfonyTableFilter);
    Vue.component("symfonyTable-row", SymfonyTableRow);
    Vue.component("symfonyTable-table", SymfonyTableTable);
 }
};

export default index;
