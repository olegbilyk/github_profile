import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'react-emotion'

const Form = styled.form`
  --color-default: #2a2a2a;
  --color-primary: #858585;
  --color-white: #fff;
  --color-link: #449ce8;
  --color-link-hover: #6071d5;
  --color-border: #d9d9d9;
  --color-border-hover: #c2c2c2;
  --color-border-focus: #949494;
  --font: system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue;

  position: relative;
  z-index: 9;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: flex-start;
  padding: 30px 30px 0;
  margin: 0 -10px -10px;
  font-family: var(--font);
  color: var(--color-dafault);

  input {
    flex-grow: 1;
    min-width: 200px;
    margin: 0 10px 10px;
    padding: 12px 28px 11px 15px;
    border: 1px solid var(--color-border);
    border-radius: 5px;
    transition: all 0.2s ease;
    font-size: 18px;
    font-weight: 400;
    color: var(--color-dafault);
    outline: none;

    ::placeholder {
      font-size: 18px;
      font-weight: 300;
      color: var(--color-primary);
    }

    :hover {
      border-color: var(--color-border-hover);
    }

    :focus {
      border-color: var(--color-border-focus);
    }
  }

  button {
    position: relative;
    flex-shrink: 0;
    margin: 0 10px;
    padding: 12px 23px 13px;
    font-size: 18px;
    font-weight: 300;
    border-radius: 5px;
    border: none;
    cursor: pointer;
    outline: none;
    overflow: hidden;
    transition: all 0.2s ease;
    font-family: var(--font);
    color: var(--color-white);
    background-color: transparent;

    ::before,
    ::after {
      content: '';
      position: absolute;
      top: 0;
      right: 0;
      left: 0;
      bottom: 0;
      z-index: -1;
      transition: all 0.6s ease;
    }

    ::before {
      opacity: 1;
      background: var(--color-link) linear-gradient(48deg, var(--color-link) 0%, var(--color-link-hover) 100%);
    }

    ::after {
      opacity: 0;
      background: var(--color-link-hover) linear-gradient(48deg, var(--color-link-hover) 0%, var(--color-link) 100%);
    }

    :hover,
    :focus {
      ::before {
        opacity: 0;
      }

      ::after {
        opacity: 1;
      }
    }

    :active {
      opacity: 0.8;
    }
  }

  @media (min-width: 700px) {  
    max-width: 60vw;
    margin: 0 0 -116px auto;
    padding: 30px;
  }
`

class SearchUser extends Component {
  static propTypes = {
    handleSearchUser: PropTypes.func.isRequired
  }

  state = {
    text: ''
  }

  formSubmit = ev => {
    ev.preventDefault()

    this.props.handleSearchUser(this.state.text)

    this.setState({
      text: ''
    })
  }

  handleInputChange = ev => {
    ev.preventDefault()

    this.setState({
      text: ev.target.value
    })
  }

  render () {
    return (
      <Form onSubmit={this.formSubmit}>
        <input
          type="text" required
          value={this.state.text}
          placeholder="Search user"
          onChange={this.handleInputChange} />
        <button type="submit">Search</button>
      </Form>
    )
  }
}

export default SearchUser
