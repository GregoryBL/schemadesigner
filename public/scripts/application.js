var MainArea = React.createClass({
  getInitialState: function() {
    return {tables: []}
  },

  render: function() {
    var mainAreaStyle = {
      backgroundColor: 'lightblue',
      width: 3000,
      height: 3000
    }
    return (
      <div style={mainAreaStyle} className="mainArea">
        {this.props.children}
      </div>
    );
  }
});

ReactDOM.render(
  <MainArea>
    <Table />
  </MainArea>,
  document.getElementById('content')
);