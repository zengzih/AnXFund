var thirdMixins = {
  data: function() {
    return {
      thirdQuery: {
        name: '',
        org: ''
      },
      thirdColumn: [],
      thirdTableData: [],
      thirdTableHeight: '',
      thirdStore: '',

      /*------- 分页-------- */
      thirdTotal: 0, // 总条数
      thirdCurrentPage: 1, // 当前页码
      thirdTotalPage: 0, // 总页码
      thirdPageSize: 0, // 每页显示条目个数
      thirdPageSizes: [], // 每页显示个数选择器的选项设置
      thirdOrderPageQuery: {}, // 排序与分页的查询条件要与查询区的分开

      /*------表单-------------*/
      thirdFormLayout: [],
      thirdFormData: {},
      thirdFormTitle: '',
      thirdFormVisible: false,
      thirdCurrentState: ''
    }

  },
  mounted: function() {
    gobal.getTableHeight(this, "third-sc-box-content", 44, 'thirdTableHeight');
  },
  created: function() {
    var _this = this;
    this.thirdColumn = [
      {label: '平台名称', prop: ''},
      {label: '所属机构', prop: ''},
      {label: '访问地址', prop: ''},
      {label: '平台说明', prop: ''},
      {label: '用户名', prop: ''},
      {label: '密码', prop: ''},
      {label: '联系人', prop: ''},

      {label: '联系电话', prop: ''},
      {label: '传真', prop: ''},
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
                _this.ThirdOperation(elt, params.row)
              }
            });
          })
        ]);
      }
      },
    ];
    this.thirdFormLayout = [
      { label: '平台名称', prop: '', rules: { required: true, message: '平台名称必填' }, render: function(h, params) {
        return _this.getRenderInput(h, params);
      } },
      { label: '所属机构', prop: '', rules: { required: true, message: '结构名称必填' }, dataName: '', render: function(h, params) {
        return _this.getRenderScSelect(h, params);
      } },
      { label: '用户名', prop: '', rules: { required: true, message: '用户名必填' }, render: function(h, params) {
        return _this.getRenderInput(h, params);
      } },
      { label: '密码', prop: '', rules: { required: true, message: '密码必填' }, render: function(h, params) {
        return _this.getRenderInput(h, params);
      } },
      { label: '联系人', prop: '', render: function(h, params) {
        return _this.getRenderInput(h, params);
      } },
      { label: '联系电话', prop: '', render: function(h, params) {
        return _this.getRenderInput(h, params);
      } },
      { label: '邮箱', prop: '', render: function(h, params) {
        return _this.getRenderInput(h, params);
      } },
      { label: '传真', prop: '', render: function(h, params) {
        return _this.getRenderInput(h, params);
      } },
      { label: '访问地址', prop: '', colspan: '2', type: 'textarea', render: function(h, params) {
        return _this.getRenderInput(h, params);
      } },
      { label: '平台说明', prop: '', colspan: '2', type: 'textarea', render: function(h, params) {
        return _this.getRenderInput(h, params);
      } }
    ];

    var endLayout = this.thirdFormLayout.slice(this.thirdFormLayout.length - 2, this.thirdFormLayout.length);
    this.thirdFormLayout = utils.transformArr(this.thirdFormLayout.slice(0, this.thirdFormLayout.length - 2), 2);
    endLayout.forEach(function(elt) {
      this.thirdFormLayout.push([elt]);
    }.bind(this));
    console.log(this.thirdFormLayout);

    this.thirdStore = new InitPublicProperty({
      vm: this,
      queryConditions: this.thirdQuery,
      currentPage: this.thirdCurrentPage,
      totalPage: this.thirdTotalPage,
      pageSize: this.thirdPageSize,
      pageSizes: this.thirdPageSizes,
      tableData: 'thirdTableData',
      tableUrl: 'https://www.easy-mock.com/mock/5b04178cda8a195fb0978657/example/dataGrid',
      formUrl: '',
      formRef: 'thirdForm',
      formData: 'thirdFormData',
      dialogName: 'thirdFormVisible',
      currentState: 'thirdCurrentState'
    });
    this.thirdStore.commit('getTableData');
  },
  methods: {
    ThirdOperation: function(oper, row) { // 操作列
      this.thirdFormTitle = oper.label;
      this.thirdCurrentState = oper.type;
      if (oper.type === 'edit' || oper.type === 'read') {
        this.thirdStore.commit('getFormData', { id: row.id });
      }
    },
    thirdQuery: function() {
      this.thirdStore.commit('query');
    },
    thirdReset: function() {
      this.thirdStore.commit('reset');
    },
    thirdAdd: function() {
      this.thirdFormTitle = '新增';
      this.thirdFormVisible = true;
    },

    /*----------表单-----------*/
    thirdFormCancel: function() {
      this.thirdStore.commit('cancel');
    },
    thirdFormSave: function() {
      this.thirdStore.commit('onSubmit')
    }
  },
  updated: function() {
    gobal.getTableHeight(this, "third-sc-box-content", 44, 'thirdTableHeight');
  }
};