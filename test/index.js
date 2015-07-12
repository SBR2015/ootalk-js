var should = require('should'),
  ootalk = require('../index');

describe('#newNode', function() {
  it('create add node', function() {
    ootalk.init();
    var node = ootalk.newNode('Add', 2, 3);

    Object.keys(node)[0].should.equal("Add");
    node.nodeid.length.should.above(0);
    node.Add.Left.should.equal(2);
    node.Add.Right.should.equal(3);
  });

  it('create constant node', function() {
    ootalk.init();
    var node = ootalk.newNode('Constant', 2);

    Object.keys(node)[0].should.equal("Constant");
    node.nodeid.length.should.above(0);
    node.Constant.Left.should.equal(2);
  });
});

describe('#searchNode', function() {
  it('search', function() {
    ootalk.init();
    var node0 = ootalk.newNode('Add', 1, 2);
    var node = ootalk.newNode('Add', node0, 3);
    var node2 = ootalk.newNode('Subtract', 3, 4);
    var node3 = ootalk.newNode('Add', node, node2);
    ootalk.append(node3);

    Object.keys(node)[0].should.equal("Add");
    node.nodeid.length.should.above(0);
    node.Add.Left.Add.Left.should.equal(1);
    node.Add.Right.should.equal(3);
    var resultNode = ootalk.searchNode(node0.nodeid);
    resultNode.parentObject.Add.Right.should.equal(3);
  });

  it('modify node', function() {
    ootalk.init();
    var const1 = ootalk.newNode('Constant', 1);
    var const2 = ootalk.newNode('Constant', 2);
    var const3 = ootalk.newNode('Constant', 3);
    var add = ootalk.newNode('Add', 3,4);
    var node0 = ootalk.newNode('Add', const1, const2);
    var node = ootalk.newNode('Add', node0, const3);
    ootalk.append(node);
    ootalk.modify(const2.nodeid, add);

    ootalk.tree()[0].Add.Left.Add.Right.Add.Left.should.equal(3);
  });
});

describe('#remove', function() {
  it('remove', function() {
    ootalk.init();
    var node0 = ootalk.newNode('Add', 1, 2);
    var node = ootalk.newNode('Add', node0, 3);
    var node2 = ootalk.newNode('Subtract', 3, 4);
    var node3 = ootalk.newNode('Add', node, node2);
    var node4 = ootalk.newNode('Add', 10, 20);
    ootalk.append(node3);
    ootalk.remove(node.nodeid);

    (ootalk.tree()[0].Add.Left === null).should.equal(true);
  });
});
