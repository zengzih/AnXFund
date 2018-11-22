var secondMixins = {
  data: function() {
    return {
      /*secondFormData: {
        userName: ''
      },*/
      secondFormData: [],
      secondQuery: {

      },
      secondPagination: null,
      secondLayout: [],

      secondHeight: '',
      secondTableColumn: [],
      secondTableData: [],

      /*-------分页------------*/
      secondTotal: 0, // 总条数
      secondCurrentPage: 1, // 当前页码
      secondTotalPage: 0, // 总页码
      secondPageSize: 0, // 每页显示条目个数
      secondPageSizes: [], // 每页显示个数选择器的选项设置
      secondOrderPageQuery: {}, // 排序与分页的查询条件要与查询区的分开

      /*----------表单---------------*/
      secondFormVisible: false,
      secondFormTitle: '',
      secondCurrentState: '',
      secondFormLayout: []
    }
  },
  mounted: function() {
    gobal.getTableHeight(this, "second-sc-box-content", 44, 'secondHeight');
  },
  created: function() {
    var _this = this;
    this.secondLayout = [
      [
        { label: '关键词', prop: '', placeHolder: '支持模糊搜索', render: function(h, params) {
          return _this.getRenderInput(h, params);
        }},
        { label: '主责任部门', prop: '', dataName: '', showCheckbox: false, render: function(h, params) {
          return _this.getRenderSelect(h, params);
        }},
        { label: '主责任岗位', prop: '', dataName: '', showCheckbox: false, render: function(h, params) {
          return _this.getRenderSelect(h, params);
        } },
        { label: '主责任人', prop: '', dataName: '', showCheckbox: false, render: function(h, params) {
          return _this.getRenderSelect(h, params);
        } }
      ],
      [
        { label: '发起人', prop: '', dataName: '', showCheckbox: false, render: function(h, params) {
          return _this.getRenderSelect(h, params);
        } },
        { label: '截止日期', prop: '', render: function(h, params) {
          return _this.getRenderDate(h, params);
        } },
        {},
        { align: 'right', render: function(h, params) {
          return h('div',{}, [
            _this.getRenderButton(h, params, { label: '查询', type: 'query', callbackFunc: function() {

            } }),
            _this.getRenderButton(h, params, { label: '重置', type: 'reset', callbackFunc: function() {

            } }),
          ])
        } }
      ]
    ];
    this.secondTableColumn = [
      { type: 'selection', width: 50, align: 'center' },
      { label: '新披事项名称', prop: 'name' },
      { label: '分工事项名称', prop: 'mappingTable' },
      { label: '主责任部门', prop: 'createdBy' },
      { label: '分工顺序', prop: '' },
      { label: '主责任岗位', prop: '' },
      { label: '主责任人', prop: '' },
      { label: '发起人', prop: '' },
      { label: '生成红头文件', prop: '' },
      {
        label: '操作', align: 'center', type: 'text', fixed: 'right', size: 'small', renderCell: function (h, params) {
        var actions = _this.actions;
        var operation = [
          {label: actions.edit.text, class: actions.edit.icon, type: 'edit'},
          {label: actions.read.text, class: actions.read.icon, type: 'read'},
          {label: actions.del.text, class: actions.del.icon, type: 'del'},
        ];
        return h('div', {}, [
          operation.map(function (elt) {
            return _this.getTooltipButton(h, params, {
              label: elt.label, class: elt.class, effect: 'light', callbackFunc: function () {
                _this.SecondOperation(elt, params.row)
              }
            });
          })
        ]);
      }
      },
    ];
    this.secondFormLayout = [
      { label: '分工事项名称', prop: 'name', rules: { required: true, message: '分工事项名称必填'}, render: function(h, params) {
        return _this.getRenderInput(h, params);
      } },
      { label: '主责任部门', prop: 'department', rules: { required: true, message: '主责任部门必填'}, dataName: '', render: function(h, params) {
        return _this.getRenderScSelect(h, params);
      } },
      { label: '主责任岗位', prop: 'ssss', rules: { required: true, message: '主责任岗位必填'}, dataName: '',  render: function(h, params) {
        return _this.getRenderScSelect(h, params);
      } },
      { label: '主责任人', prop: 'xxxx', rules: { required: true, message: '主责任人必填'}, dataName: '', render: function(h, params) {
        return _this.getRenderScSelect(h, params);
      } },
      { label: '生成红头文件', prop: 'file', rules: { required: true, message: '生成红头文件必填' }, dataName: '', render: function(h, params) {
        return _this.getRenderScSelect(h, params);
      } },
      { label: '分工顺序', prop: 'aaaaa', slot: 'reference',  rules: { required: true, message: '分工顺序必填' }, render: function(h, params) {
        return h('ElPopover', {
          props: {
            placement: 'right',
            trigger: 'hover',
          }
        }, [
          h('div', [
            [111,222,333,44].map(function(elt) {
              return h('div', elt);
            })
          ]),
          _this.getRenderInput(h, params)
        ])
      } },
      {
        label: '上传文件', type: 'upload', prop: 'dfffff', render: function(h, params) {
        return _this.getRenderUpload(h, params);
      }
      },
      {
        label: '发起OA', prop: 'OA',  render: function(h, params) {
        return _this.getRenderButton(h, params, { label: '发起OA', type: 'task', callbackFunc: function() {
          _this.startOA(params)
        } });
      }
      }
    ];
    this.initSecondFormData();

    this.secondFormLayout = utils.transformArr(this.secondFormLayout, 2);
    this.secondPagination = new InitPublicProperty({
      vm: this,
      queryConditions: this.secondQuery,
      currentPage: this.secondCurrentPage,
      totalPage: this.secondTotalPage,
      pageSize: this.secondPageSize,
      pageSizes: this.secondPageSizes,
      tableData: 'secondTableData',
      tableUrl: 'https://www.easy-mock.com/mock/5b04178cda8a195fb0978657/example/dataGrid',
      formUrl: '',
      formRef: 'secondForm',
      formData: 'secondFormData',
      dialogName: 'secondFormVisible',
      currentState: 'secondCurrentState'
    });
    this.secondPagination.commit('getTableData');
  },
  methods: {
    initSecondFormData: function() {
      var obj = {};
      this.secondFormLayout.forEach(function(elt) {
        obj.id = utils.getUuId();
        Object.keys(elt).forEach(function(key) {
          obj[key] = '';
        });
      });
      this.secondFormData.push(obj);
      console.log(this.secondFormData);
    },
    secondAdd: function() {
      this.secondFormVisible = true;
      this.secondCurrentState = 'add';
      this.secondFormTitle = '新增';
    },
    secondCopy: function() {

    },
    secondExport: function() {

    },

    /*---------表格---------*/
    SecondOperation: function(oper, row) { // 操作
      this.secondCurrentState = oper.type;
      this.secondFormTitle = oper.label;
      if (oper.type === 'edit') {
        this.secondPagination.commit('getFormData', { url: 'https://www.easy-mock.com/mock/5b04178cda8a195fb0978657/example/detail' });
      }
      if (oper.type === 'del') {
        this.secondPagination.commit('deleteRow');
      }
    },
    secondSelectionChange: function() { // 表格选中

    },


    /*---------表单----------------*/
    startOA: function(params) {
      var obj = {
        type: 'warning',
        title: '提示',
        text: '是否确认此节点发起OA流程？'
      }
      gobal.openComfirm(this, obj, function () {

      });
    },
    addFormBlock: function(form) { // 加
      this.initSecondFormData();
    },
    minusFormBlock: function(form) { // 减
      this.secondFormData.forEach(function(elt, index) {
        if(elt.id === form.id) {
          this.secondFormData.splice(index, 1);
        }
      })
    },
    secondFormSave: function() {
      this.secondPagination.commit('onSubmit')
    },
    secondFormCancel: function() {
      this.secondPagination.commit('cancel');
    }
  },
  updated: function() {
    gobal.getTableHeight(this, "second-sc-box-content", 46, 'secondHeight');
  }
};