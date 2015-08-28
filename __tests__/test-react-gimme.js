"use strict";

jest.dontMock('react/addons');
jest.dontMock('react');

var React = require("react/addons");
var testUtils = React.addons.TestUtils;


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

describe("react-gimme", function () {
  it("should shallow render", function () {
    var renderer = testUtils.createRenderer();
    renderer.render(<ParentComponent>foo</ParentComponent>);
    var result = renderer.getRenderOutput();
    //t.plan(1);
    expect(result.type).toEqual(ChildComponent);
  });


  it("should dom render", function () {
    //setup();
    const component = testUtils.renderIntoDocument(<ParentComponent>foo</ParentComponent>);
    const kids = testUtils.scryRenderedComponentsWithType(component, ChildComponent);
    expect(kids[0].props.children).toEqual("foo");
  });
});
