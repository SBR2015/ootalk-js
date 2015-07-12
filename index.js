var crypto = require('crypto');

var Node = function(operator, left, right, middle) {
  var newNode = {};
  var idsource = (new Date()).toTimeString() + operator + left;
  newNode[operator].Left = left;
  if (right !== 'undefined') {
    idsource += right;
    newNode[operator].Right = right;
  }
  if (middle !== 'undefined') {
    idsource += middle;
    newNode[operator].Middle = middle;
  }

  var hash = crypto.createHash('sha1');
  hash.update(idsource);
  var nodeid = hash.digest('hex');
  newNode.nodeid = nodeid;
  newNode.createdAt = new Date();

  return newNode;
};

var _Tree = [];

module.exports = {
  init: function() {
    _Tree = [];
  },
  reset: function() {
    this.init();
  },
  newNode: function(operator, left, right, middle) {
    return new Node(operator, left, right, middle);
  },
  append: function(node) {
    _Tree.push(node);
  },
  insert: function(atIndex, node) {
    _Tree.splice(atIndex, 0, node);
  },
  modify: function(nodeid, node) {
    var result = this.searchNode(nodeid);
    if (result !== null) {
      if (result.parentObject !== null) {
        var elem = result.element;
        result.parentObject[Object.keys(result.parentObject)[0]][elem] = node;
        _Tree[result.nodeIndex] = result.root;
      } else {
        _Tree[result.nodeIndex] = node;
      }
    }
  },
  remove: function(nodeid) {
    var result = this.searchNode(nodeid);
    if (result !== null) {
      if (result.parentObject !== null) {
        var elem = result.element;
        result.parentObject[Object.keys(result.parentObject)[0]][elem] = null;
        _Tree[result.nodeIndex] = result.root;
      } else {
        _Tree.splice(result.nodeIndex, 1);
      }
    }
  },
  tree: function() {
    return _Tree;
  },
  searchNode: function(nodeid) {
    var result = {};
    for (var i = 0; i < _Tree.length; i++) {
      var node = _Tree[i];
      if (node.nodeid === nodeid) {
        result.parentObject = null;
        result.node = node;
        result.nodeIndex = i;
        result.root = node;
        break;
      }

      result = this._searchObjectRecursive(node, nodeid, i);
      if (result !== null) {
        result.root = node;
        break;
      }
    }

    return result;
  },
  _searchObjectRecursive: function(node, nodeid, index) {
    var key = Object.keys(node)[0];
    var element = node[key];

    for (var elemKey in element) {
      if (element.hasOwnProperty(elemKey)) {
        var obj = element[elemKey];
        if (typeof(obj) === 'object') {
          if (obj.nodeid === nodeid) {
            return {
              element: elemKey,
              parentObject: node,
              node: obj,
              nodeIndex: index
            };
          }

          var n = this._searchObjectRecursive(obj, nodeid, index);
          if (n !== null) {
            return n;
          }
        }
      }
    }
    return null;
  },
};
