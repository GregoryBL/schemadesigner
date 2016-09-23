var LEFT_BUTTON = 0;
var DRAG_THRESHOLD = 3; // pixels

var boxSource = {
  beginDrag(props) {
    var { id, left, top } = props;
    return { id, left, top };
  }
};

var Table = React.createClass({
  getInitialState: function() {
    return {
      mouseDown: false,
      dragging: false,
      left: 0,
      top: 0
    }
  },

  tableStyle: function() {
    if (this.state.dragging) {
      return {
        width: 200,
        height: 400,
        backgroundColor: 'blue',
        position: 'absolute',
        left: this.state.left,
        top: this.state.top
      }
    } else {
      return {
        width: 200,
        height: 400,
        backgroundColor: 'green',
        position: 'absolute',
        left: this.state.left,
        top: this.state.top
      }
    }
  },

  render: function() {
    var that = this
    return (
      <div
        ref={function(obj) { that.boundingDiv = obj }}
        style={this.tableStyle()}
        className="table"
        onMouseDown={this.onMouseDown}
      >
        Hey it's a table.
      </div>
    );
  },

  onMouseDown: function(event) {
    if (event.button == LEFT_BUTTON) {
      event.stopPropagation();
      this.addEvents();
      console.log(this.boundingDiv)
      var pageOffset = this.boundingDiv.getBoundingClientRect();
      this.setState({
        mouseDown: true,
        originX: event.pageX,
        originY: event.pageY,
        elementX: pageOffset.left,
        elementY: pageOffset.top
      });
    }
  },

  onMouseMove: function(event) {
    var deltaX = event.pageX - this.state.originX;
    var deltaY = event.pageY - this.state.originY;
    var distance = Math.abs(deltaX) + Math.abs(deltaY);

    if (!this.state.dragging && distance > DRAG_THRESHOLD) {
      this.setState({dragging: true});
    }

    if (this.state.dragging) {
      this.setState({
        left: this.state.elementX + deltaX + document.body.scrollLeft,
        top: this.state.elementY + deltaY + document.body.scrollTop
      });
    }
  },

  onMouseUp: function() {
    this.removeEvents();
    if (this.state.dragging) {
      this.setState({dragging: false});
    }
  },

  addEvents: function() {
    document.addEventListener('mousemove', this.onMouseMove);
    document.addEventListener('mouseup', this.onMouseUp);
  },

  removeEvents: function() {
    document.removeEventListener('mousemove', this.onMouseMove);
    document.removeEventListener('mouseup', this.onMouseUp);
  }
});