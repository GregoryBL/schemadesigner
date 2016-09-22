var Table = React.createClass({
  render: function() {
    var tableStyle = {
      width: 200,
      height: 400,
      backgroundColor: 'green'
    }
    return (
      <div style={tableStyle} className="table">
        Hey it's a table.
      </div>
    );
  }
});