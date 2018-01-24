import React from 'react'
import PropTypes from 'prop-types'
import {shortUrl, getUrls} from "../modules/shortener"

export class Shortener extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      url: '',
      shortUrl: null,
      save: ''
    }
  }

  urlChangeHandler(event) {
    this.setState({url: event.target.value})
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.shortener === 'Save success')
    {
      location.reload();
    }
  }

  shortUrlChangeHandler (event) {
    this.setState({shortUrl: event.target.value})
  }

  componentDidMount () {
    this.props.getUrls();
  }

  sendForm(event) {
    event.preventDefault()
    this.props.shortUrl(this.state)
  }

  save(){
    if(this.state.shortUrl === null)
    {
      this.setState({save: true})
    }
  }

  render () {
    let urls = Array.from(this.props.urls);
    let customInput;
    let btn;
    if(this.props.shortener.shortURL || this.props.shortener)
    {
      customInput = <div><input onChange={this.shortUrlChangeHandler.bind(this)} defaultValue={this.props.shortener.shortURL} type="text" className='shortener__form_input col-md-6' /><br /></div>;
      btn = <button onClick={this.save.bind(this)} type='submit' className='btn btn-primary'>SAVE</button>
    }
    else
    {
      customInput = null
      btn =  <button type='submit' className='btn btn-primary'>SHORT URL</button>
    }
    return (
      <div className='content'>
        <div className='shortener'>
          <h1 className='col-md-5'>URL shortener</h1>
          <form className='shortener__form col-md-12' onSubmit={this.sendForm.bind(this)}>
            <input onChange={this.urlChangeHandler.bind(this)} className='shortener__form_input col-md-6' type='text' placeholder='Your original URL here' />
            <br />
            {customInput}
            {btn}
          </form>
        </div>
        <div className='url-list'>
          <table className='table table-striped url-table'>
            <thead>
            <tr>
              <th className='first-th'>Original URL</th>
              <th>Short URL</th>
              <th className='last-th'>All clicks</th>
            </tr>
            </thead>
            <tbody>
            {urls.map(function(url, index){
              return <tr key={index}>
                <td className='first-td'><a href={url.long_url}>{url.long_url}</a></td>
                <td><a href={url.short_url}>{url.short_url}</a></td>
                <td className='last-td'>{url.clicks}</td>
              </tr>
            })}
            </tbody>
          </table>
        </div>
      </div>)
  }
  }

export default Shortener
