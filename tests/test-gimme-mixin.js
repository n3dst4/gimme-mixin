"use strict";
var test = require("tape-catch");
var React = require("react/addons");
var testUtils = React.addons.TestUtils;
var jsdom = require("jsdom");

function setup() {
  var doc = jsdom.jsdom('<!doctype html><html><body></body></html>')
  var win = doc.defaultView
  //return [doc, win];

  global.document = doc
  global.window = win
  //propagateToGlobal(win)


  // // from mocha-jsdom https://github.com/rstacruz/mocha-jsdom/blob/master/index.js#L80
  // function propagateToGlobal (window) {
  //   for (let key in window) {
  //     if (!window.hasOwnProperty(key)) continue
  //     if (key in global) continue
  //
  //     global[key] = window[key]
  //   }
  // }
}

function teardown () {
  delete global.document;
  delete global.window;
}

var ParentComponent = React.createClass({
  render () {
    return <ChildComponent>{this.props.children}</ChildComponent>;
  }
});

var ChildComponent = React.createClass({
  render () {
    return <div>{this.props.children}</div>;
  }
});

test("shallow render", function (t) {
  var renderer = testUtils.createRenderer();
  renderer.render(<ParentComponent>foo</ParentComponent>);
  var result = renderer.getRenderOutput();
  t.plan(1);
  t.equal(result.type, ChildComponent);
});


test("dom render", function (t) {
  setup();
  const component = testUtils.renderIntoDocument(<ParentComponent>foo</ParentComponent>);
  const kids = testUtils.scryRenderedComponentsWithType(component, ChildComponent);

  t.plan(1)
  t.equal(kids[0].props.children, "foo");
});
