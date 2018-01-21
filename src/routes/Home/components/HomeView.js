import React from 'react'
import DuckImage from '../assets/Duck.jpg'
import './HomeView.scss'
import {shortURL} from "../modules/home";

export class HomeView extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      url: ''
    }

  }

  urlChangeHandler(event) {
    console.log('EVENT', event.target.value);
    this.setState({url: event.target.value});
  }

  sendForm(event){
    event.preventDefault();
    shortURL(this.state);
  }

  render () {
    let btnText = 'SHORTEN URL';
    let customInput = <input type="text" className='shortener__form_input col-md-6' />;
    return (
      <div className='content'>
        <div className='shortener'>
          <h1 className='col-md-5'>URL shortener</h1>
          <form className='shortener__form col-md-12' onSubmit={this.sendForm.bind(this)}>
            <input onChange={this.urlChangeHandler.bind(this)} className='shortener__form_input col-md-6' type='text' placeholder='Your original URL here' />
            <br />
            <button type='submit' className='btn btn-primary'>{btnText}</button>
          </form>
        </div>
        <div className='url-list'>
          <table className='table table-striped'>
            <thead>
              <tr>
                <th>Original URL</th>
                <th>Short URL</th>
                <th>All clicks</th>
              </tr>
            </thead>
            <tbody>
            </tbody>
          </table>
        </div>
      </div>)
  }
}


export default HomeView
