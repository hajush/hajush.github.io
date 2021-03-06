import React from 'react';

class BlogForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      user: []
    };
  }

  componentDidMount() {
    this.loadUser();
  }

  loadUser() {
    $.ajax({
      url: '/api/blogs/user',
      dataType: 'json',
      cache: false,
      success: function(user) {
        this.setState({user: user});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(status, err.toString());
      }
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    var title = this.refs.title.value;
    var body = this.refs.body.value;

    if (!title) {
      return;
    }
    var data = ({title: title, body: body});
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      data: data,
      type: 'POST',
      success: function(dataSuccess) {
        console.log('posting data!' + dataSuccess);
        document.location = '/index.html';
      },
      error: function(xhr, status, err) {
        console.log('not posting data!');
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
    React.findDOMNode(this.refs.title);
  }

  render() {
    var user;

    if (this.state.user.local) {
      user = this.state.user.local.username;
    } else {
      user = 'NO USER SIGNED IN';
    }

    return (
              <div>
               <form>
                   <div className="form-group">
                       <label >Title</label>
                       <input type="text" className="form-control" ref="title" placeholder="title"/>
                   </div>
                   <div className="form-group">
                       <label>Post</label>
                       <textarea rows="15" className="form-control" ref="body" placeholder="body"></textarea>
                   </div>
                   <button onClick={this.handleSubmit} type="submit" className="btn btn-default">Submit</button>
               </form>
              </div>
           );
  }
}

BlogForm.propTypes = {url: React.PropTypes.string.isRequired};

module.exports = BlogForm;
