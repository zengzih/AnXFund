var InitPublicProperty = function (opt) {
  opt = opt || {};
  this.orderPageQuery = {};
  Object.keys(opt).forEach(function (key) {
    this[key] = opt[key];
  }.bind(this));
  this.init();
};
InitPublicProperty.prototype.init = function () {
  this.pageSize = gobal.pagination.pageSize;
  this.pageSizes = gobal.pagination.pageSizes;
  if (this.queryConditions) {
    this.queryConditions[gobal.pagination.page] = 1;
    this.queryConditions[gobal.pagination.rows] = this.pageSize;
    this.queryInit = utils.myAssign({}, this.queryInit, this.queryConditions);

    this.orderPageQuery[gobal.pagination.page] = 1;
    this.orderPageQuery[gobal.pagination.rows] = this.pageSize;
    this.orderPageQuery = utils.myAssign({}, this.orderPageQuery, this.queryConditions); // 查询参数初始化
  }
};
InitPublicProperty.prototype.commit = function (name) {
  var arg = [].slice.call(arguments, 1);
  if (this.mutations[name]) {
    this.mutations[name].apply(this, arg);
  }
};
InitPublicProperty.prototype.mutations = {
  query: function () {
    this.commit('getTableData');
  },
  reset: function () {
    this.pageSize = gobal.pagination.pageSize;
    this.pageSizes = gobal.pagination.pageSizes;
    this.queryConditions = utils.myAssign({}, this.queryConditions, this.queryInit);
    this.orderPageQuery = utils.myAssign({}, this.orderPageQuery, this.queryInit);
    this.currentPage = 1;
    this.commit('getTableData');
  },
  deleteRow: function (opt) { //删
    opt = opt || {};
    var _this = this;
    var para = opt.data || {};
    var obj = gobal.getComfirmInfo(dictFormState.del);
    var curUrl = opt.url ? opt.url : utils.isNotEmpty(this.delUrl) ? this.delUrl : (this.vm.urls ? this.vm.urls.del : '');
    if (!curUrl) return;
    gobal.openComfirm(this.vm, obj, function () {
      request.post(_this.vm, curUrl, para, function (data) {
        gobal.messageShow(_this.vm, data);
        _this.commit('getTableData');
      });
    });
  },
  getTableData: function (queryConditions) {
    var _this = this;
    var curUrl = utils.isNotEmpty(this.tableUrl) ? this.tableUrl : (this.vm.urls ? this.vm.urls.table : '');
    var curQueryConditions = utils.isNotEmpty(queryConditions) ? queryConditions : this.queryConditions;
    if (!curUrl) return;
    request.post(this.vm, curUrl, curQueryConditions, function (data) {
      this.vm[this.tableData] = data.rows;
      this.totalPage = data.total;
      if (this.vm.$refs['myTable']) {
        this.vm.$refs['myTable'].resetScroll();
      }
    }.bind(this));
  },
  currentChange: function (val) {
    this.currentPage = val;
    this.currentRow = val;
    this.orderPageQuery[gobal.pagination.page] = val;
    this.queryConditions[gobal.pagination.page] = val;
    this.commit('getTableData', this.orderPageQuery);
  },
  sizeChange: function (val) {
    this.pageSize = val;
    this.currentPage = 1;
    this.orderPageQuery[gobal.pagination.rows] = this.pageSize;
    this.queryConditions[gobal.pagination.rows] = this.pageSize;
    this.commit('getTableData', this.orderPageQuery);
  },
  // 表单
  onSubmit: function (opt) {
    opt = opt || {};
    if (!this.formRef && !opt.formRef) {
      throw '缺失formName';
    }
    this.vm.$refs[this.formRef || opt.formRef].validate(function (valid) {
      if (valid) {
        this.commit('formSubmit', opt);
      } else {
        return false;
      }
    }.bind(this))
  },
  formSubmit: function (opt) {
    opt = opt || {};
    var strUrl = opt.formUrl || this.vm.urls ? this.vm.urls[this.currentState] : '';
    request.post(this, strUrl, opt.formData || this.formData, function (data) {
      if (data.success) this[opt.dialogName || 'dialogFormVisible'] = false;
      gobal.messageShow(this.vm, data);
      this.commit('getTableData');
    }.bind(this));
  },
  getFormData: function (opt) {
    var opt = opt || {};
    this.vm[this.dialogName] = true;
    var url = opt.url ? opt.url : (this.formUrl ? this.formUrl : (this.vm ? this.vm.urls.form : ''));
    if (!url) return;
    request.post(this.vm, url, opt.data || {}, function (data) {
      var formData = opt.formData ? opt.formData : this.vm[this.formData];
      data = data || {};
      Object.keys(data).forEach(function (key) {
        if (formData.hasOwnProperty(key)) {
          formData[key] = data[key];
        }
      }.bind(this));
      this.commit('setFormPropert');
    }.bind(this));
  },
  setFormPropert: function (state) {
    debugger;
    var isDisabled = this.currentState === 'red';
    state = state || this.currentState || {};
    Object.keys(state).forEach(function (key) {
      if (key !== 'editKeys') {
        if (state.editKeys) {
          if (state.editKeys.indexOf(key) !== -1) {
            state[key] = isDisabled;
          }
        } else {
          state[key] = isDisabled;
        }
      }
    });
  },
  cancel: function () {
    this.vm[this.dialogName] = false;
    this.vm.$refs[this.formRef].resetFields();
  }
};


var publicComponents = {
  components: {
    VRender: {
      functional: true,
      name: 'VRender',
      props: {
        row: Array,
        column: Object,
        index: Object,
        render: Function
      },
      render: function (h, ctx) {
        var params = {
          column: ctx.props.column,
          row: ctx.props.row,
          index: ctx.props.index
        };
        if (ctx.props.render) {
          return ctx.props.render(h, params);
        }
      }
    },
    VPagination: { // 分页
      functional: true,
      props: {
        currentChange: Function,
        target: Object,
        sizeChange: Function,
        pageSizes: [Number, String],
        pageSize: [Number, String],
        totalPage: [Number, String],
        currentPage: [Number, String],
        className: String
      },
      render: function (h, ctx) {
        var _this = ctx.parent;
        return h('ElPagination', {
          class: 'sc-box-content-page ' + (ctx.props.className ? ctx.props.className : 'sc-box-content'),
          props: {
            currentPage: ctx.props.currentPage || 1,
            pageSizes: ctx.props.pageSizes || gobal.pagination.pageSizes,
            pageSize: ctx.props.pageSize || gobal.pagination.pageSize,
            total: ctx.props.totalPage || _this.totalPage,
            layout: 'total, sizes, prev, pager, next, jumper'
          },
          on: {
            'current-change': function (val) {
              if (ctx.props.currentChange) {
                ctx.props.currentChange(val);
              } else if (ctx.props.target) {
                ctx.props.target.commit('currentChange', val)
              } else {
                _this.currentPage = val;
                _this.currentRow = val;
                _this.orderPageQuery && (_this.orderPageQuery[gobal.pagination.page] = val);
                _this.queryConditions && (_this.queryConditions[gobal.pagination.page] = val);
                _this.getTableData(_this.orderPageQuery);
              }
            },
            'size-change': function (val) {
              if (ctx.props.sizeChange) {
                ctx.props.sizeChange(val);
              } else if (ctx.props.target) {
                ctx.props.target.commit('sizeChange', val);
              } else {
                _this.pageSize = val;
                _this.orderPageQuery && (_this.orderPageQuery[gobal.pagination.rows] = _this.pageSize);
                _this.queryConditions && (_this.queryConditions[gobal.pagination.rows] = _this.pageSize);
                _this.getTableData();
              }
            }
          }
        })
      }
    },
    VTable: {
      props: {
        column: Array,
        data: Array,
        border: {
          type: Boolean,
          default: true
        },
        configColumns: Array,
        showConfigTable: Boolean,
        height: [String, Number],
        sortChange: Function
      },
      render: function (h, ctx) {
        var self = this.$parent;
        while (self.$parent !== undefined) {
          self = self.$parent;
        }
        var _this = this;
        var column = this.column === undefined ? self.column : this.column;
        return h('ElTable', {
          props: {
            configColumns: this.configColumns,
            showConfigTable: this.showConfigTable,
            data: this.data === undefined ? self.data : this.data,
            height: this.height === undefined ? self.tableHeight : this.height,
            selectionChange: Function
          },
          on: {
            // 事件
            'sort-change': function (val) {
              if (this.onSort) {
                this.sortChange(val);
              } else {
                self.onSort(val);
              }
            },
            'selection-change': function (selection) {
              if (this.selectionChange) {
                this.selectionChange(selection)
              } else if (this.handleSelection) {
                this.handleSelection(selection);
              } else {
                self.handleSelection(selection);
              }
            },
            openconfigtable: function () {
              _this.$emit('openconfigtable');
            }
          }
        }, [
          this._l(column, function (elt) {
            var _default = {headerAlign: 'center'};
            var colParams = {};
            for (var i in elt) {
              colParams[i] = elt[i];
            }
            colParams = Object.assign(colParams, _default);
            if (elt.renderCell) {
              return h('ElTableColumn', {
                props: colParams,
                scopedSlots: {
                  default: function (val) {
                    if (elt.renderCell) {
                      return elt.renderCell(h, val);
                    }
                  }
                }
              })
            } else {
              return h('ElTableColumn', {
                props: colParams,
              })
            }
          })
        ])
      }
    },
    VLayout: {
      functional: true,
      props: {},
      created: function () {

      }
    },
    vCalendar: {
      props: {
        data: Array,
        defaultColumn: {
          type: Array,
          default: function () {
            return [{label: '星期一'}, {label: '星期二'}, {label: '星期三'}, {label: '星期四'}, {label: '星期五'}, {label: '星期六'}, {label: '星期日'}]
          }
        },
        year: {
          type: [String, Number],
          default: ''
        },
        month: {
          type: [String, Number],
          default: ''
        },
        weekMode: Boolean
      },
      data: function () {
        return {
          date: '',
          week: '',
          rowCount: 6, // 要生成的表格的行数
          weekCount: 6, // 用来周月切换时使用
          dayNum: 0,
          calenderData: [],
          fewWeeks: 0,
          thisWeek: { // 记录当前周
            fewWeeks: 0, // 记录当前周的位置
            week: {}
          },
          column: [],
          layoutWidth: [],
          calender: '',

          // 拖拽
          dragging: false,
          resizeProxy: '',
          draggingColumn: [] // 拖拽的当前列
        }
      },
      watch: {
        weekMode: function (val) {
          if (val) {
            var date = new Date();
            this.year = date.getFullYear();
            this.month = date.getMonth() + 1;
            this.handleNextWeek();
          }
        }
      },
      computed: {
        getDateDetail: function () {
          var defaultDate = new Date();
          var date = new Date(this.year, this.month - 1);
          var weekDay = date.getDay();
          date.setDate(2 - weekDay);
          var result = [];
          Array.apply(null, {length: this.rowCount * 7}).forEach(function () {
            var isDefaultDate = false;
            if (date.getFullYear() === defaultDate.getFullYear() && date.getMonth() === defaultDate.getMonth() && defaultDate.getDate() === date.getDate()) {
              isDefaultDate = true;
            }
            var day = date.getDate();
            var thisDate = new Date(date);
            result.push({
              isDefaultDate: isDefaultDate,
              year: thisDate.getFullYear(),
              month: thisDate.getMonth() + 1,
              week: thisDate.getDay(),
              day: thisDate.getDate()
            });
            date.setDate(day + 1);
          });
          return result;
        }
      },
      created: function () {
        var date = new Date();
        this.year = this.year || date.getFullYear();
        this.month = this.month || date.getMonth() + 1;
        if (this.weekMode) {
          this.handleNextWeek();
        }
      },
      mounted: function () {
        this.doLayout();
      },
      methods: {
        typeOf: function (obj) {
          var toString = Object.prototype.toString;
          var map = {
            '[object Boolean]': 'boolean',
            '[object Number]': 'number',
            '[object String]': 'string',
            '[object Function]': 'function',
            '[object Array]': 'array',
            '[object Date]': 'date',
            '[object RegExp]': 'regExp',
            '[object Undefined]': 'undefined',
            '[object Null]': 'null',
            '[object Object]': 'object'
          };
          return map[toString.call(obj)];
        },
        deepCopy: function (data) {
          var t = this.typeOf(data);
          var o;

          if (t === 'array') {
            o = [];
          } else if (t === 'object') {
            o = {};
          } else {
            return data;
          }

          if (t === 'array') {
            for (var i = 0; i < data.length; i++) {
              o.push(this.deepCopy(data[i]));
            }
          } else if (t === 'object') {
            for (var i in data) {
              o[i] = this.deepCopy(data[i]);
            }
          }
          return o;
        },
        doLayout: function () {
          this.calender = this.$refs.calender;
          this.resizeProxy = this.$refs.resizeProxy;
          var bodyWidth = this.calender.offsetWidth;
          this.column.forEach(function (elt, index) {
            this.$set(elt, 'className', 'el-table_1_column_' + index);
          }.bind(this));
          // 计算全部的宽度
          var bodyMinWidth = this.column.reduce(function (prev, col) {
            return prev + (col.width || col.minWidth || 80)
          }, 0);
          var flexColumns = this.column.filter(function (elt) {
            return typeof elt.width !== 'number';
          });
          var totalFlexWidth = bodyWidth - bodyMinWidth
          if (flexColumns.length === 1) {
            flexColumns[0].realWidth = (flexColumns[0].minWidth || 80) + totalFlexWidth;
          } else {
            var flexColumnAllWidth = flexColumns.reduce(function (prev, column) {
              return prev + (column.minWidth || 80)
            }, 0);
            var noneFirstWidth = 0;
            var flexWidthPerPixel = totalFlexWidth / flexColumnAllWidth;
            flexColumns.forEach(function (column, index) {
              if (index === 0) {
                return;
              }
              var flexWidth = Math.floor((column.minWidth || 80) * flexWidthPerPixel);
              noneFirstWidth += flexWidth;
              column.realWidth = (column.minWidth || 80) + flexWidth;
            });
            flexColumns[0].realWidth = (flexColumns[0].minWidth || 80) + totalFlexWidth - noneFirstWidth;
          }
        },
        calendarTool: function (type) {
          switch (type) {
            case 'prevYear':
              this.year--;
              break;
            case 'prevMonth':
              if (this.weekMode) {
                /*if (this.fewWeeks > 0) {
                  this.fewWeeks--;
                }*/
                this.handlePrevWeek();
              } else {
                if (this.month == 1) {
                  this.month = 12;
                  this.year--;
                } else {
                  this.month--;
                }
              }
              break;
            case 'thisMonth':
              var date = new Date();
              if (this.weekMode) {
                this.handleNextWeek('thisMonth')
                // this.fewWeeks = this.thisWeek.fewWeeks;
              } else {
                this.year = date.getFullYear();
                this.month = date.getMonth() + 1;
              }
              break;
            case 'nextMonth':
              if (this.weekMode) {
                if (this.fewWeeks < 6) {
                  this.handleNextWeek();
                }
              } else {
                if (this.month == 12) {
                  this.month = 1;
                  this.year++;
                } else {
                  this.month++;
                }
              }
              break;
            case 'nextYear':
              this.year++;
              break;
          }
        },
        getWeekColumn: function (week, details) {
          week = week || {};
          var details = details || this.getDateDetail;
          var obj = {};
          details.forEach(function (elt, i) {
            if (elt.isDefaultDate) {
              obj.defaultIndex = i;
            } else {
              if (JSON.stringify(elt) == JSON.stringify(week)) {
                obj.weekIndex = i;
              }
            }
          }.bind(this));
          return obj;
        },
        getDateGroup: function(date, type) {
          var thisIndex = 0;
          this.getDateDetail.forEach(function (elt, index) {
            if (date.year) {
              if (date.year === elt.year && date.month === elt.month && date.day === elt.day) {
                thisIndex = (type == 'prev' ? index : index + 1);
              }
            } else {
              if (elt.isDefaultDate) {
                thisIndex = index;
              }
            }
          });
          return thisIndex;
        },
        handlePrevWeek: function () {
          var details = this.getDateDetail;
          var columnStart = this.column.length ? this.column[0]: {};
          var index = this.getDateGroup(columnStart, 'prev');
          if (index < 7) {
            if (this.month == 1) {
              this.month = 12;
              this.year--;
            } else {
              this.month--;
            }
            details = this.getDateDetail.concat(details);
            // 去重
            var unique = {};
            for (var i = 0; i < details.length; i++) {
              if (unique[JSON.stringify(details[i])]) {
                details.splice(i, 1);
                i--;
              } else {
                unique[JSON.stringify(details[i])] = true;
              }
            }
            // 重新获取坐标
            index = this.getDateGroup(columnStart, 'prev');
          }
          this.column = details.slice(index - 7, index);
        },
        handleNextWeek: function (type) {
          var details = this.getDateDetail;
          if (type){
            var isDefault = false;
            details.forEach(function(elt) {
              if (elt.isDefaultDate) {
                isDefault = true;
              }
            });
            // 当返回的回来的时间集里面没有当前的日期时，就获取当前的日期
            if (!details.length || isDefault === false) {
              var date = new Date();
              this.year = date.getFullYear();
              this.month = date.getMonth() + 1;
              details = this.getDateDetail;
            }
            var thisWeek = {};
          } else {
            var thisWeek = this.column[this.column.length - 1] || {};
          }
          var obj = this.getWeekColumn(thisWeek);
          var index = obj.weekIndex ? obj.weekIndex  + 1 : obj.defaultIndex;
          var column = details.slice(index, index + 7);
          this.column = this.getWeekLength({ column: column, type: 'next', detail: details, index: index });
        },
        // 判断当前月份是否够，不够要用下个月份补齐
        getWeekLength: function (opt) {
          var details = opt.detail;
          if (opt.type === 'next') {
            if (opt.column.length !== 0 && opt.column.length < 7) {
              if (this.month == 12) {
                this.month = 1;
                this.year++;
              } else {
                this.month++;
              }
              details = details.concat(this.getDateDetail);
              var unique = {};
              for (var i = 0; i < details.length; i++) {
                if (unique[JSON.stringify(details[i])]) {
                  details.splice(i, 1);
                  i--;
                } else {
                  unique[JSON.stringify(details[i])] = true;
                }
              }
            }
            return details.slice(opt.index, opt.index + 7);
          }
          if (opt.type == 'prev') {
            if (opt.column.length < 7) {
              if (this.month == 1) {
                this.month = 12;
                this.year--;
              } else {
                this.month--;
              }
              details = this.getDateDetail.concat(details);
            }
            return details.slice(opt.index - 7, opt.index);
          }
        },
        handleMousemove: function (e, col) {
          var target = e.target;
          while (target && target.tagName !== 'TH') {
            target = target.parentNode;
          }
          if (!this.dragging) {
            var bodyStyle = document.body.style;
            var rect = target.getBoundingClientRect();
            if (rect.width > 12 && rect.right - event.pageX < 8) {
              bodyStyle.cursor = 'col-resize';
              this.draggingColumn = col;
            } else if (!this.dragging) {
              bodyStyle.cursor = '';
              this.draggingColumn = null;
            }
          }
        },
        handleMouseout: function () {
          document.body.style.cursor = '';
        },
        handleMousedown: function (event, column) {
          var _this = this;
          if (this.draggingColumn) {
            var table = this.createEl;
            this.resizeProxy.style.display = 'block';
            const columnEl = this.$el.querySelector(`th.${column.className}`);
            // tableHeaderWrapper
            var tableLeft = this.calender.getBoundingClientRect().left;
            var columnRect = columnEl.getBoundingClientRect();
            var minLeft = columnRect.left - tableLeft + 30;
            this.dragState = {
              startMouseLeft: event.clientX,
              startLeft: columnRect.right - tableLeft,
              startColumnLeft: columnRect.left - tableLeft,
              tableLeft: tableLeft
            };
            this.resizeProxy.style.left = this.dragState.startLeft + 'px';
            document.onselectstart = function () {
              return false;
            };
            document.ondragstart = function () {
              return false;
            };
            var handleMouseMove = function (event) {
              var deltaLeft = event.clientX - _this.dragState.startMouseLeft;
              var proxyLeft = _this.dragState.startLeft + deltaLeft;
              _this.resizeProxy.style.left = Math.max(minLeft, proxyLeft) + 'px';
            };
            var handleMouseUp = function () {
              var startColumnLeft = _this.dragState.startColumnLeft;
              var finalLeft = parseInt(_this.resizeProxy.style.left, 10);
              var columnWidth = finalLeft - startColumnLeft;
              _this.$set(column, 'width', columnWidth);
              document.body.style.cursor = '';
              _this.dragState = {};
              _this.resizeProxy.style.display = 'none';
              _this.doLayout();
              _this.dragging = false;
              _this.draggingColumn = null;
              document.onselectstart = null;
              document.ondragstart = null;
              document.removeEventListener('mousemove', handleMouseMove);
              document.removeEventListener('mouseup', handleMouseUp);
            };
            document.addEventListener('mousemove', handleMouseMove);
            document.addEventListener('mouseup', handleMouseUp);
          }
        },
      },
      render: function (h) {
        var _this = this;
        var data = this.data || [];
        var getIsThisDate = function (week, day) {
          var index = week * 7 + day;
          var detail = this.getDateDetail[index];
          return detail.isDefaultDate;
        };
        // 对传过来的数据比对进行content渲染
        var getRenderContent = function (detail) {
          var year = detail.year;
          var month = detail.month;
          var day = detail.day;
          var h = this.$createElement;
          var result = [];
          data.forEach(function (child) {
            if (child.year == year && child.month == month && child.day == day) {
              result.push(h('div', {class: 'content'}, child.render ? child.render(h, detail) : child.content), h('div', {class: 'link'}, '查看更多'));
            }
          }.bind(this));
          return result;
        };
        var getMonthInner = function (week, day, col) {
          var h = this.$createElement;
          if (_this.weekMode) {
            return h('div', {class: 'week_mode_content'}, 'content')
          } else {
            var index = week * 7 + day;
            var detail = this.getDateDetail[index];
            var vColor = '';
            if (detail.month !== this.month) {
              vColor = '#ccc';
            } else {
              vColor = '#000';
            }
            return h('div', {
              class: detail.isDefaultDate ? ' day-today' : '',
              style: {
                color: vColor,
              }
            }, [
              h('span', {class: 'day'}, detail.day),
              h('div', {}, getRenderContent.call(this, detail))
            ]);
          }
        };
        var getCalendarHeader = function (detail) {
          if (_this.weekMode) {
            return detail.year + '-' + detail.month + '-' + detail.day + '  ' + (detail.week !== 0 ? _this.defaultColumn[detail.week - 1].label : _this.defaultColumn[_this.defaultColumn.length - 1].label);
          } else {
            return detail.label;
          }
        };
        var getCalenderBody = function (column) {
          if (_this.weekMode) {
            _this.weekCount = 1;
          } else {
            _this.weekCount = 6;
          }
          return h('tbody', {}, [
            Array.apply(null, {length: _this.weekCount}).map(function (row, rowIndex) {
              return h('tr', {
                class: 'el-table__row',
                on: {},
              }, [
                column.map(function (item, colIndex) {
                  var isThisDate = getIsThisDate.call(_this, rowIndex, colIndex);
                  return h('td', {
                    class: 'kl-calendar_day-box ' + (isThisDate ? 'this_date' : '')
                  }, [
                    h('div', {
                      class: 'cell'
                    }, [getMonthInner.call(_this, rowIndex, colIndex, item)])
                  ])
                })
              ])
            })
          ])
        };
        if (!this.weekMode) {
          this.column = this.defaultColumn;
        }
        var column = this.column;
        return h('div', {
          class: 'calendar_wrapper' + (this.weekMode ? ' week_mode_calender' : '') + '',
          ref: 'calender'
        }, [
          h('div', {class: 'calendar_header'}, [
            h('div', {class: 'calendar_slot'}, this.$slots.default),
            h('div', {class: 'calendar_render-info'}, [
              h('span', {class: 'calendar_year'}, this.year + '年'),
              h('span', {class: 'calendar_month'}, this.month + '月')
            ]),
            h('div', {class: 'calendar_tool'}, [
              [
                //{type: 'prevYear', icon: 'el-icon-d-arrow-left'},
                {type: 'prevMonth', icon: 'el-icon-arrow-left'},
                {type: 'thisMonth', icon: '', label: _this.weekMode ? '本周' : '今天'},
                {type: 'nextMonth', icon: 'el-icon-arrow-right'},
                // {type: 'nextYear', icon: 'el-icon-d-arrow-right'},
              ].map(function (elt) {
                return h('span', {
                  class: 'tool_btn',
                  on: {
                    click: function () {
                      _this.calendarTool(elt.type)
                    }
                  }
                }, elt.label ? elt.label : [
                  h('i', {class: elt.icon})
                ])
              })
            ])
          ]),
          h('div', {
            class: 'el-table el-table--fit el-table--border el-table--enable-row-transition'
          }, [
            h('div', {
              class: 'el-table__column-resize-proxy',
              ref: 'resizeProxy',
              style: {
                display: 'none'
              }
            }),
            h('div', {
                class: 'el-table__body-wrapper'
              },
              [
                h('table', {
                  class: 'el-table__body',
                  style: {
                    width: '100%'
                  },
                  attrs: {
                    cellspacing: '0',
                    cellpadding: '0',
                    border: '0'
                  }
                }, [
                  h('colgroup', {}, [
                    column.map(function (col) {
                      return h('col', {
                        style: {
                          width: (col.width || col.realWidth) + 'px'
                        }
                      })
                    })
                  ]),
                  h('thead', {}, [
                    h('tr', {}, [
                      column.map(function (elt) {
                        return h('th', {
                          class: elt.className,
                          style: {
                            textAlign: 'center'
                          },
                          on: {
                            mousemove: function (event) {
                              _this.handleMousemove(event, elt);
                            },
                            mouseout: function (event) {
                              _this.handleMouseout(event);
                            },
                            mousedown: function (event) {
                              _this.handleMousedown(event, elt);
                            }
                          }
                        }, getCalendarHeader(elt));
                      })
                    ])
                  ]),
                  getCalenderBody(column)
                ])
              ])
          ])
        ])
      }
    },
  },
  methods: {
    getTooltipButton: function (h, params, options) {
      var col = params.column;
      return h('ElTooltip', {
        props: {
          effect: options.effect || 'dark',
          content: options.label,
          placement: 'left',
          enterable: false
        }
      }, [
        this.getRenderButton(h, params, options)
      ]);
    },
    getRenderButton: function (h, params, options) { // options 按钮的配置 label type
      var col = params.column;
      return h('ElButton', {
        props: {
          type: col.type || options.type,
          size: col.size || options.size || '',
          disabled: col.disabled || options.disabled,
          icon: col.icon || options.icon || ''
        },
        on: {
          click: function () {
            if (options.callbackFunc instanceof Function) { // 适用于表单布局
              options.callbackFunc(); // 回调函数
            }
            if (col.callbackFun instanceof Function) { // 适用于表格
              col.callbackFun(options ? options : params); // 回调函数
            }
          }
        }
      }, options.class ? [
        h('i', {
          class: options.class
        })
      ] : options.label);
    },
    getRenderInput: function (h, params) {
      var row = params.row;
      var col = params.column;
      var disabled = (typeof col.disabled == 'boolean' ? col.disabled : row[col.disabled]);
      return h('ElInput', {
        props: {
          value: row[col.prop],
          type: col.type,
          disabled: disabled,
          placeholder: col.placeholder
        },
        on: {
          input: function (val) {
            row[col.prop] = val;
          }
        },
        slot: col.slot
      });
    },
    getRenderIndex: function (h, params) {
      return h('span', params.index + 1);
    },
    getRenderSelect: function (h, params) {
      var row = params.row;
      var col = params.column;
      var index = params.index;
      var option = this.dataSource[col.dataName] || []; // dataName表示数据源的名字
      if (col.sourceParam) { // 关联下拉时使用
        if (col.sourceParam.data instanceof Array) {
          option = col.sourceParam.data; // 直接在sourceParam中定义的数据源
        } else {
          // 因为vue规定不能直接在this中给data添加或修改属性，所以需要一个dataSource，将数据放入dataSource
          option = this.dataSource[row[col.sourceParam.name]] || [];
        }
      }
      var _this = this;
      // 当表格中使用select组件时，设置disabled就需要在当前行中去设置disabled了，所以需要row[col.disabled]，平常表单布局直接在col中设置disabled即可。
      var disabled = (typeof col.disabled == 'boolean' ? col.disabled : row[col.disabled]);
      return h('ElSelect', {
        props: {
          value: row[col.prop], // 如果是表单局部，此处的row就是queryConditions or formData，如果在表格中使用，则row就表示表中的row
          disabled: disabled,
          clearable: col.clearable
        },
        on: {
          input: function (val) {
            _this.$set(row, col.prop, val); //  extendKey 当前下拉用来显示的别名字段，因为code可能一样
          },
          change: function (val) {
            if (col.callbackFun instanceof Function) {
              col.callbackFun(params, val)
            }
          }
        }
      }, [
        this._l(option, function (child) {
          return h('ElOption', {
            props: {
              key: child[col.nodeKey] || child.ddName || child.ftKey, //  nodeKey  指定的key
              label: child.ddName || child.ftName,
              value: child[col.nodeKey] || child.ddKey || child.ftKey
            }
          });
        })
      ]);
    },
    getRenderDate: function (h, params) {
      var row = params.row;
      var col = params.column;
      return h('ElDatePicker', {
        props: {
          disabled: col.disabled,
          value: row[col.prop],
          type: col.type || 'date',
          placeholder: col.type == 'dateTime' ? '请选择时间' : '请选择日期'
        },
        on: {
          input: function (val) {
            row[col.prop] = val;
          },
          change: function (val) {
            row[col.prop] = val;
          }
        }
      })
    },
    getRenderScSelect: function (h, params) {
      var row = params.row;
      var col = params.column;
      var index = params.index;
      var option = this.dataSource[col.dataName] || [];
      if (col.sourceParam) { // 关联下拉
        if (col.sourceParam.data instanceof Array) {
          option = col.sourceParam.data;
        } else {
          option = this.dataSource[row[col.sourceParam.name] + col.sourceParam.joinEnd] || [];
        }
      }
      return h('ScSelect', {
        props: {
          disabled: row[col.disabled],
          data: option,
          value: row[col.prop],
          filterable: col.filterable,
          clearable: true,
          showCheckbox: true,
          defaultProps: col.defaultProps
        },
        on: {
          input: function (val) {
            row[col.prop] = val;
          }
        }
      })
    },
    getRenderUpload: function (h, params) {
      var row = params.row;
      var col = params.column;
      var index = params.index;
      return h('ElUpload', {
        props: {
          action: col.action || '',
          onPreview: col.onPreview || this.onPreview,
          onRemove: col.onRemove || this.onRemove,
          onSuccess: col.onSuccess || this.onSuccess,
          onChange: col.onChange || this.onChange,
          beforeUpload: col.beforeUpload || this.beforeUpload,
          disabled: col.disabled,
          fileList: col.fileList,
          data: col.data
        },
        class: col.class,
        on: {
          onChange: function () {
          },
          onPreview: function () {
          },
          onRemove: function () {
          },
          onSuccess: function () {
          },
          beforeUpload: function () {
          },
        }
      }, [
        h('ElButton', {
          props: {
            size: 'small',
            type: col.type || 'primary'
          }
        }, '点击上传'),
        h('div', {
          slot: 'tip',
          class: 'el-upload__tip'
        }, (col.tipMsg instanceof Function) ? col.tipMsg() : col.tipMsg)
      ])
    },
    getRenderScSelectTree: function (h, params) {
      var row = params.row;
      var col = params.column;
      var index = params.index;
      var option = this.dataSource[col.dataName] || [];
      if (col.sourceParam) { // 关联下拉
        if (col.sourceParam.data instanceof Array) {
          option = col.sourceParam.data;
        } else {
          option = this.dataSource[row[col.sourceParam.name] + col.sourceParam.joinEnd] || [];
        }
      }
      return h('ScSelectTree', {
        props: {
          disabled: row[col.disabled],
          data: option,
          value: row[col.prop],
          filterable: col.filterable,
          placeholder: col.placeholder,
          defaultExpandAll: col.defaultExpandAll,
          defaultCheckAll: col.defaultCheckAll,
          showPopover: col.showPopover,
          popoverWidth: col.popoverWidth,
          clearable: col.clearable !== undefined ? col.clearable : true,
          showCheckbox: col.showCheckbox !== undefined ? col.showCheckbox : true,
          defaultProps: col.defaultProps,
          defaultExpandedKeys: col.defaultExpandedKeys
        },
        on: {
          change: function (node, allnode) {
            col.change && col.change(node, allnode)
          },
          'visible-change': function (bool) {
            col.visibleChange && col.visibleChange(bool);
          },
          clear: function () {
            col.clear && col.clear();
          },
          'check-change': function (thisNode, thisNodeParent, allCheckNode, node) {
            col.checkChange && col.checkChange(thisNode, thisNodeParent, allCheckNode, node);
          },
          'node-expand': function (node) {
            col.nodeExpand && col.nodeExpand(node);
          },
          'node-collapse': function (node) {
            col.nodeCollapse && col.nodeCollapse(node);
          }
        }
      })
    }
  }
};
var publicMethod = {
  data: function () {
    return {
      queryInit: {},
      currentPage: 1,
      totalPage: 0,
      pageSize: 0,
      pageSizes: [],
      tableHeight: '',
      currentState: ''
    }
  },
  created: function () {
    $("body").addClass("sc-skin1");
    this.pageSize = gobal.pagination.pageSize;
    this.pageSizes = gobal.pagination.pageSizes;
    //表格数据加载
    if (this.queryConditions) {
      this.queryConditions[gobal.pagination.page] = 1;
      this.queryConditions[gobal.pagination.rows] = this.pageSize;
      this.queryInit = utils.myAssign({}, this.queryInit, this.queryConditions);
    }
    this.formDataInit = utils.myAssign({}, this.formDataInit, this.formData);
    this.getTableData && this.getTableData();
    this.actions = gobal.getActions();
  },
  methods: {
    getTableData: function (url, queryConditions) {
      var _this = this;
      var curUrl = utils.isNotEmpty(url) ? url : this.urls.table;
      var curQueryConditions = utils.isNotEmpty(queryConditions) ? queryConditions : this.queryConditions;
      request.post(this, curUrl, curQueryConditions, function (data) {
        _this.tableData = data.rows;
        if (_this.$refs['myTable']) {
          _this.$refs['myTable'].resetScroll();
        }
      });
    },

    onQuery: function () {
      this.getTableData && this.getTableData();
    },

    onReset: function () {
      this.queryConditions = utils.myAssign({}, this.queryConditions, this.queryInit);
      this.getTableData && this.getTableData();
    },

    onSubmit: function (opt) {
      opt = opt || {};
      if (!opt.formName) {
        throw '缺失formName';
      }
      this.$refs[opt.formName].validate(function (valid) {
        if (valid) {
          this.formSubmit();
        } else {
          return false;
        }
      }.bind(this))
    },

    formSubmit: function (opt) {
      opt = opt || {};
      var strUrl = opt.url || this.urls[this.currentState];
      request.post(this, strUrl, opt.formData || this.formData, function (data) {
        if (data.success) this[opt.dialogName || 'dialogFormVisible'] = false;
        gobal.messageShow(this, data);
        this.getTableData();
      }.bind(this));
    },

    setFormState: function (mode) {
      var vState = false;
      var vKeyStr = "";
      this.currentState = mode;
      if (mode == dictFormState.read) vState = true;
      if (mode == dictFormState.edit) vKeyStr = this.state.editKeys;
      for (var key in this.state) {
        if (key != "editKeys") {
          this.state[key] = vState;
          if (vKeyStr != "") {
            if (vKeyStr.indexOf(key) >= 0) this.state[key] = true;
          }
        }
      }
    },

    getFormData: function (opt, callback) {
      opt = opt || {};
      request.post(this, opt.url || this.urls.form, opt.data, function (data) {
        this.setFormState(state);
        this[opt.formData || 'formData'] = data;
        this.formData = data;
        this.setFormState(data, opt.state);
        if (callback instanceof Function) {
          callback && callback(data);
        }
      }.bind(this));
    }
  }
};