var Node = function(options) {
    this.init(options);
};
Node.prototype.init = function(options) {
    this.data = null;
    this.parent = null;
    for (var name in options) {
        if (options.hasOwnProperty(name)) {
            this[name] = options[name];
        }
    }
    this.level = 0;
    this.childNodes = [];
    if (this.parent) {
        this.level = this.parent.level + 1;
    }
    if (this.data) {
        this.setData(this.data);
    }
};

Node.prototype.setData = function(data) {
    this.data = data;
    this.childNodes = [];
    var children;
    if (this.level === 0 && this.data instanceof Array) {
        children = this.data;
    } else {
        children = data.children || [];
    }

    for (var i = 0, j = children.length; i < j; i++) {
        this.insertChild({data: children[i]});
    }
};

Node.prototype.insertChild = function(child) {
    if (!(child instanceof Node)) {
        Object.assign(child, {
            parent: this,
        });
        var childs = new Node(child);
    }
    childs.level = this.level + 1;
    this.childNodes.push(childs);
};

Node.prototype.getNode = function(id) {
    var parentNode;
    var getParentNode = function(node) {
        var childNodes = node && node.childNodes;
        childNodes.forEach(function(child) {
            if (id == child.data.id) {
                parentNode = child;
                return;
            } else {
                if (child.childNodes && child.childNodes.length) {
                    getParentNode(child);
                }
            }
        })
    };
    getParentNode(this);
    return parentNode;
};

var nodeUtil = {
    /**
     *
     * @param id
     */
    getParentIds : function(node){
        var array = [];
        this.getParentIdRecursion(node,array);
        return array;
    },
    getParentIdRecursion : function(node,array){
        if(node.parent == null || node.parent == undefined || node.parent.length == 0 || node.parent.level == 0){
            return array;
        }else{
            array.push(node.parent.data.id);
            this.getParentIdRecursion(node.parent,array);
        }
    }

}
