var org =  {
  data: function() {
    return {
      orgQuery: {
        name: '',
        org: ''
      },
      orgColumn: [],
      orgTableData: [],
      orgTableHeight: '',
      orgStore: '',

      /*------- 分页-------- */
      orgTotal: 0, // 总条数
      orgCurrentPage: 1, // 当前页码
      orgTotalPage: 0, // 总页码
      orgPageSize: 0, // 每页显示条目个数
      orgPageSizes: [], // 每页显示个数选择器的选项设置
      orgOrderPageQuery: {}, // 排序与分页的查询条件要与查询区的分开

      /*------表单-------------*/
      orgFormLayout: [],
      orgFormData: {},
      orgFormTitle: '',
      orgFormVisible: false,
      orgCurrentState: ''


    }
  },
  mounted: function() {
    gobal.getTableHeight(this, "org-sc-box-content", 44, 'orgTableHeight');
  },
  created: function() {
    var _this = this;
    this.orgColumn = [
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
                _this.orgOperation(elt, params.row)
              }
            });
          })
        ]);
      }
      },
    ];
    this.orgFormLayout = [
      { label: '机构名称', prop: '', rules: { required: true, message: '结构名称必填' }, render: function(h, params) {
        return _this.getRenderInput(h, params);
      } },
      { label: '机构类型', prop: '', rules: { required: true, message: '结构名称必填' }, dataName: '', render: function(h, params) {
        return _this.getRenderScSelect(h, params);
      } },
      { label: '机构负责人', prop: '', render: function(h, params) {
        return _this.getRenderInput(h, params);
      } },
      { label: '负责人电话', prop: '', render: function(h, params) {
        return _this.getRenderInput(h, params);
      } },
      { label: '联系人', prop: '', render: function(h, params) {
        return _this.getRenderInput(h, params);
      } },
      { label: '联系电话', prop: '', render: function(h, params) {
        return _this.getRenderInput(h, params);
      } },
      { label: '联系邮箱', prop: '', render: function(h, params) {
        return _this.getRenderInput(h, params);
      } },
      { label: '传真', prop: '', render: function(h, params) {
        return _this.getRenderInput(h, params);
      } },
      { label: '备注', prop: '', colspan: '2', type: 'textarea', render: function(h, params) {
        return _this.getRenderInput(h, params);
      } }
    ];

    var endLayout = this.orgFormLayout.slice(this.orgFormLayout.length - 1, this.orgFormLayout.length);
    this.orgFormLayout = utils.transformArr(this.orgFormLayout.slice(0, this.orgFormLayout.length - 1), 2);
    this.orgFormLayout.push(endLayout);
    console.log(this.orgFormLayout);

    this.orgStore = new InitPublicProperty({
      vm: this,
      queryConditions: this.orgQuery,
      currentPage: this.orgCurrentPage,
      totalPage: this.orgTotalPage,
      pageSize: this.orgPageSize,
      pageSizes: this.orgPageSizes,
      tableData: 'orgTableData',
      tableUrl: '',
      formUrl: '',
      formRef: 'orgForm',
      formData: 'orgFormData',
      dialogName: 'orgFormVisible',
      currentState: 'orgCurrentState'
    });
    this.orgStore.commit('getTableData');
  },
  methods: {
    orgOperation: function(oper, row) { // 操作列
      this.orgFormTitle = oper.label;
      this.orgCurrentState = oper.type;
      if (oper.type === 'edit' || oper.type === 'read') {
        this.orgStore.commit('getFormData', { id: row.id });
      }
    },
    orgQuery: function() {
      this.orgStore.commit('query');
    },
    orgReset: function() {
      this.orgStore.commit('reset');
    },
    orgAdd: function() {
      this.orgFormTitle = '新增';
      this.orgFormVisible = true;
    },

    /*----------表单-----------*/
    orgFormCancel: function() {
      this.orgStore.commit('cancel');
    },
    orgFormSave: function() {
      this.orgStore.commit('onSubmit')
    }
  },
  updated: function() {
    gobal.getTableHeight(this, "org-sc-box-content", 44, 'orgTableHeight');
  }
}