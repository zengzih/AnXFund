var firstMixins =  {
  data: function () {
    return {
      firstQuery: {
        search: ''
      },
      firstTableColumn: [],
      firstTableData: [],
      firstTableHeight: '',
      config: [],
      configColumns: [],

      firstPagination: null,

      firstTotal: 0, // 总条数
      firstCurrentPage: 1, // 当前页码
      firstTotalPage: 0, // 总页码
      firstPageSize: 0, // 每页显示条目个数
      firstPageSizes: [], // 每页显示个数选择器的选项设置
      firstOrderPageQuery: {}, // 排序与分页的查询条件要与查询区的分开

      /*----------表单 START----------*/
      firstFormColumn: [],
      firstFormTitle: '新增',
      firstFormVisible: false,
      firstCurrentState: '',
      firstFormData: {

      },
      firstFormState: '', // 表单类型(新增、复制等)
      /*----------表单 END----------*/

      dataSource: { // 数据源

      },

      // 变量说明
      vDescriptionVisible: false,
      vDescriptionColumn: [],
      vDescriptionTableData: [],

      /*-------- 授权 START-------- */
      authorVisible: false,


    }
  },
  computed: {
    getFirstFormColumn: function() {
      var result = this.firstFormColumn.slice();
      if (this.firstFormState !== 'add') {
        result = this.firstFormColumn.filter(function(elt) {
          return !elt.label !== '关联报表方案'
        });
      }
      var endColumn = utils.transformArr(result.slice(result.length - 4, result.length), 1);
      result = utils.transformArr(result.slice(0, result.length - 4), 2);
      [].push.apply(result, endColumn);
      return result;
    }
  },
  created: function () {
    var _this = this;
    this.firstTableColumn = [
      {type: 'selection', width: 50, fixed: true, align: 'center'},
      {label: '信披事项名称', prop: 'name', fixed: true, renderCell: function(h, params){
        // 点击跳转 任务清单管理 界面
      }},
      {label: '信息披露类型', prop: 'age'},
      {label: '信息披露子类型'},
      {label: '披露方式'},
      {label: '公告模板'},
      {label: '信披主体'},
      {label: '产品生命周期'},
      {label: '产品类型'},
      {label: '信披事项类型'},
      {label: '触发频率'},
      {
        label: '分工设置', renderCell: function (h, params) {

      }
      },
      {label: '截止日类型'},
      {label: '截止日计算天数'},
      {label: '工作日类型'},

      {label: '提醒开始方式'},
      {label: '提醒开始计算天数'},
      {label: '提醒次数'},
      {label: '归属公司'},
      {label: '发起部门固定'},

      {label: '发起部门'},
      {label: '发起岗位'},
      {label: '发起人员'},
      {label: '主责任部门'},
      {label: '主责任岗位'},
      {label: '主责任人员'},
      {label: '支持自动生成'},
      {label: '第三方复核'},
      {label: '复核机构'},
      {label: '生效日期'},

      {label: '失效日期'},
      {label: '要公告'},
      {label: '要报送'},
      {label: '报送平台'},
      {label: '要备案'},
      {label: '备案平台'},
      {label: '发起OA签报'},
      {label: 'OA签报流程编号'},
      {label: '记录状态'},
      {label: '填报字段说明'},

      {label: '法律法规/报送指引'},
      {label: '报送原因'},
      {label: '备注'},
      {label: '流程名称'},
      {
        label: '操作', align: 'center', type: 'text', fixed: 'right', size: 'small', renderCell: function (h, params) {
        var actions = _this.actions;
        var operation = [
          {label: actions.edit.text, class: actions.edit.icon, type: 'edit'},
          {label: actions.read.text, class: actions.read.icon, type: 'read'},
          {label: actions.copy.text, class: actions.copy.icon, type: 'copy'},
          {label: '关联报表方案', class: actions.copy.icon, type: ''},
          {label: '授权管理', class: actions.copy.icon},
          {label: '分工设置', class: actions.copy.icon},
          {label: '失效', class: actions.copy.icon},
          {label: actions.del.text, class: actions.del.icon, type: 'del'},
        ];
        return h('div', {}, [
          operation.map(function (elt) {
            return _this.getTooltipButton(h, params, {
              label: elt.label, class: elt.class, effect: 'light', callbackFunc: function () {
                _this.handleOperation(elt, params.row)
              }
            });
          })
        ]);
      }
      },
    ];
    this.firstTableData = [
      {name: 'test', age: 10},
      {name: 'test1', age: 20}
    ];
    this.firstTableColumn.forEach(function (elt) {
      this.$set(elt, 'minWidth', 150);
    }.bind(this));
    this.config = this.firstTableColumn;
    this.firstPagination = new InitPublicProperty({
      vm: this,
      queryConditions: this.firstQuery,
      currentPage: this.firstCurrentPage,
      totalPage: this.firstTotalPage,
      pageSize: this.firstPageSize,
      pageSizes: this.firstPageSizes,
      tableUrl: '',
      formRef: 'firstForm',
      formData: this.firstFormData,
      dialogName: this.firstFormVisible,
      currentState: this.firstCurrentState
    });
    this.firstPagination.commit('getTableData');

    // 表单
    this.firstFormColumn = [
      { label: '信披事项名称', prop: '', render: function(h, params) {
        return _this.getRenderInput(h, params);
      } },
      { label: '信息披露类型', prop: '', dataName: '', showCheckbox: false, rules: {required: true, message: '信息披露类型必填'}, render: function(h, params) {
        return _this.getRenderScSelect(h, params);
      } },
      { label: '信息披露子类型', prop: '', dataName: '', showCheckbox: false, rules: {required: true, message: '信息披露子类型必填'}, render: function(h, params) {
        return _this.getRenderScSelect(h, params);
      } },
      { label: '披露方式', prop: '', rules: {required: true, message: '披露方式类型必填'}, dataName: '', render: function(h, params) {
        return _this.getRenderScSelect(h, params);
      } },
      { label: '信披主体', prop: '', showCheckbox: false, dataName: '', rules: {required: true, message: '信披主体必填'}, render: function(h, params) {
        return _this.getRenderScSelect(h, params);
      } },
      { label: '产品生命周期', prop: '', showCheckbox: false, dataName: '', render: function(h, params) {
        return _this.getRenderScSelect(h, params);
      } },
      { label: '产品类型', prop: '', showCheckbox: false, dataName: '', render: function(h, params) {
        return _this.getRenderScSelect(h, params);
      } },
      { label: '信披事项类型', prop: '', showCheckbox: false, dataName: '', rules: {required: true, message: '信披事项类型必填'}, render: function(h, params) {
        return _this.getRenderScSelect(h, params);
      } },
      { label: '触发频率', prop: '', showCheckbox: false, dataName: '', render: function(h, params) {
        return _this.getRenderScSelect(h, params);
      } },
      { label: '截止日类型', prop: '', showCheckbox: false, dataName: '', render: function(h, params) {
        return _this.getRenderScSelect(h, params);
      } },
      { label: '截止日计算天数', prop: '', type: 'number', placeHolder: '请填入具体数字', render: function(h, params) {
        return _this.getRenderInput(h, params);
      } },
      { label: '工作日类型', prop: '', showCheckbox: false, dataName: '', render: function(h, params) {
        return _this.getRenderScSelect(h, params);
      } },
      { label: '提醒开始方式', prop: '', showCheckbox: false, dataName: '', render: function (h, params) {
        return _this.getRenderScSelect(h, params);
      } },
      { label: '提醒开始计算天数', prop: '', type: 'number', placeHolder: '请填入具体数字', render: function(h, params) {
        return _this.getRenderInput(h, params);
      } },
      { label: '提醒次数', prop: '', type: 'number', render: function(h, params) {
        return _this.getRenderInput(h, params);
      } },
      { label: '归属部门', prop: '', showCheckbox: false, dataName: '', rules: { required: true, message: '归属部门必填'}, render: function(h, params) {
        return _this.getRenderScSelect(h, params);
      } },
      { label: '发起部门固定', prop: '', showCheckbox: false, dataName: '', render: function(h, params) {
        return _this.getRenderScSelect(h, params);
      } },
      { label: '发起部门', prop: '', showCheckbox: false, dataName: '', render: function(h, params) {
        return _this.getRenderScSelect(h, params);
      } },
      { label: '发起岗位', prop: '', showCheckbox: false, dataName: '', render: function(h, params) {
        return _this.getRenderScSelect(h, params);
      } },
      { label: '发起人员', prop: '', showCheckbox: false, dataName: '', render: function(h, params) {
        return _this.getRenderScSelect(h, params);
      } },
      { label: '主责任部门', prop: '', showCheckbox: false, dataName: '', rules: { required: true, message: '主责任部门必填' }, render: function(h, params) {
        return _this.getRenderInput(h, params);
      } },
      { label: '主责任岗位', prop: '', showCheckbox: false, dataName: '', rules: { required: true, message: '主责任岗位必填' }, render: function(h, params) {
        return _this.getRenderInput(h, params);
      } },
      { label: '主责人员', prop: '', showCheckbox: false, dataName: '', rules: { required: true, message: '主责人员必填' }, render: function(h, params) {
        return _this.getRenderInput(h, params);
      } },
      { label: '支持自动生成', prop: '', showCheckbox: false, dataName: '', rules: { required: true, message: '支持自动生成必填' }, render: function(h, params) {
        return _this.getRenderScSelect(h, params);
      } },
      { label: '第三方复核', prop: '', showCheckbox: false, dataName: '', rules: { required: true, message: '第三方复核必填' }, render: function(h, params) {
        return _this.getRenderScSelect(h, params);
      } },
      { label: '复核机构', prop: '', showCheckbox: false, dataName: '', render: function(h, params) {
        return _this.getRenderScSelect(h, params);
      } },
      { label: '生效日期', prop: '', render: function(h, params) {
        return _this.getRenderDate(h, params);
      } },
      { label: '失效日期', prop: '', render: function(h, params) {
        return _this.getRenderDate(h, params);
      } },
      { label: '报送平台', prop: '', dataName: '', render: function(h, params) {
        return _this.getRenderScSelect(h, params);
      } },
      { label: '要备案', prop: '', showCheckbox: false, dataName: '', render: function(h, params) {
        return _this.getRenderScSelect(h, params);
      } },
      { label: '备案平台', prop: '', dataName: '', render: function(h, params) {
        return _this.getRenderScSelect(h, params);
      } },
      { label: '发起OA签报', prop: '', showCheckbox: false, dataName: '', rules: { required: true, message: '发起QA签报必填' }, render: function(h, params) {
        return _this.getRenderScSelect(h, params);
      } },
      { label: 'OA签报流程编号', prop: '', render: function(h, params) {
        return _this.getRenderInput(h, params);
      } },
      { label: '流程名称', prop: '', render: function(h, params) {
        return _this.getRenderInput(h, params);
      } },
      { label: '公报模板', prop: '', class: 'template_upload', tipMsg: function() {
        var h = _this.$createElement;
        return [h('span', {
          domProps: {
            innerHTML: '只能上传 <b style="color: red">.docx</b> 格式'
          }
        })];
      },
        beforeUpload: function(file) {
          var type = file.name.substr(file.name.lastIndexOf('.'), file.name.length);
          if (type !== '.docx') {
            gobal.messageShow(_this, {msg: '文件格式不正确', code: 2});
            return false;
          } else {
            return true;
          }
        },
        render: function(h, params) {
          return _this.getRenderUpload(h, params);
        } },
      {
        label: '关联报表方案', prop: '', dataName: '', showCheckbox: false, render: function (h, params) {
        return _this.getRenderScSelectTree(h, params);
      } },
      { label: '填报字段说明', prop: '', type: 'textarea', placeholder: '输入文字可超过4000字符', colSpan: 2, render: function(h, params) {
        return _this.getRenderInput(h, params);
      } },
      { label: '法律法规/报送指引', prop: '', type: 'textarea', placeholder: '输入文字可超过4000字符', colSpan: 2, render: function(h, params) {
        return _this.getRenderInput(h, params);
      } },
      { label: '报送原因', prop: '', type: 'textarea', placeholder: '输入文字可超过4000字符', colSpan: 2, render: function(h, params) {
        return _this.getRenderInput(h, params);
      } },
      { label: '备注', prop: '', type: 'textarea', placeholder: '输入文字可超过4000字符', colSpan: 2, render: function(h, params) {
        return _this.getRenderInput(h, params);
      } }
    ];
    this.firstFormColumn.forEach(function(elt) {
      // this.firstFormData[elt.prop] = '';
    }.bind(this));
    this.firstFormData = Object.assign({}, this.firstFormData);

    // 变量说明
    this.vDescriptionColumn = [
      { label: '变量', prop: 'variable', minWidth: 120, align: 'center' },
      { label: '数据定义', prop: 'dataDefinition', minWidth: 160, align: 'center' },
      { label: '数据生成', prop: 'dataCreate', minWidth: 120, align: 'center' }
    ];
    this.vDescriptionTableData = [
      { variable: '{编号}', dataDefinition: '红头文件的编号', dataCreate: '系统按顺序自动生成' },
      { variable: '{内容编辑}', dataDefinition: '红头文件的编号', dataCreate: '系统按顺序自动生成' },
      { variable: '{日期}', dataDefinition: '红头文件的编号', dataCreate: '系统按顺序自动生成' },
    ]
  },
  mounted: function () {
    gobal.getTableHeight(this, "first-sc-box-content", 40, 'firstTableHeight');
  },
  methods: {
    // 查询
    firstQueryEvent: function () {
      this.firstPagination.commit('query');
    },
    // 新增
    firstAddEvent: function () {
      this.firstFormTitle = '新增';
      this.firstFormState = 'add';
      this.firstCurrentState = 'add';
    },
    // 批量审核
    firstBatchAudit: function () {

    },
    // 反审核
    firstAntiAudit: function () {

    },
    // 表格选中事件
    handleSelection: function(selection) {

    },
    // 操作列
    handleOperation: function(item, row) {
      this.firstFormTitle = item.label;
      this.firstFormState = item.type;
      switch (item.type) {
        case 'read':
          this.firstCurrentState = 'read';
          this.firstPagination.commit('getFormData', { data: { id: row.id } });
          this.firstFormVisible = true;
          break;
        case 'edit':
          this.firstCurrentState = 'edit';
          this.firstPagination.commit('getFormData', { data: { id: row.id } });
          this.firstFormVisible = true;
          break;

      }
    },
    openConfigTable: function () {
      this.$refs.tableConfig.openDialog();
      /*var _this = this;
      request.post(_this, _this.urls.getOriginDatas, {
        tableCode : 'acctInfoByType'
      }, function(data) {
        if (data && data.rows.length == 0) {
          _this.$refs.tableConfig.openDialog();
          _this.config = _this.$refs.multipleTable.store.states.originColumns;
        } else {
          _this.$refs.tableConfig.openDialog();
          _this.originData = _this.originData_copy;
          _this.config = data.rows;
        }
      });*/
    },
    applyconfig: function (column) {
      this.configColumns = column;
    },
    /*--------------主表单----------------*/
    firstFormCancel: function() {
      this.firstFormVisible = false;
    },
    firstFormSave: function() {
      this.firstPagination.commit('onSubmit');
    },

    /*--------------主表单 END ----------------*/

    getVDescriptionData: function() {
      // 获取变量说明数据
      this.vDescriptionVisible = true;
    },

    /*-----------权限 START------------*/
    authorSave: function() {

    },
    authorCancel: function() {
      this.authorVisible = false
    },
    /*-----------权限 END------------*/

  },
  updated: function () {
    gobal.getTableHeight(this, "first-sc-box-content", 40, 'firstTableHeight');
  }
};