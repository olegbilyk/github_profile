import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { css } from 'emotion'
import styled from 'react-emotion'
import Promise from 'bluebird'
import { IconFork, IconSecret, PreloaderPage } from '../icons'

const ProfileGitHubWrapper = styled.section`
  --color-default: #858585;
  --color-white: #fff;
  --color-primary: #333;
  --color-primary-2: #449ce8;
  --color-primary-3: #6071d5;
  --color-link: #333;
  --color-link-hover: #449ce8;
  --color-link-active: #4083cb;
  --font: system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue;

  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  font-family: var(--font);
  font-size: 18px;
  line-height: 1.5;
  font-weight: 400;
  letter-spacing: 0;
  color: var(--color-default);
`

const Header = styled.div`
  margin: 30px;
`

const Body = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 100%);
  grid-gap: 30px;
  max-width: 100%;
  margin: 30px;

  @media (min-width: 600px) {
    grid-template-columns: repeat(2, 50%);
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(3, 33.333%);
  }
`

const Link = styled.a`
  display: inline-block;
  text-decoration: none;
  transition: all 0.2s ease;
  color: var(--color-link);
  outline: none;

  :hover,
  :focus {
    color: var(--color-link-hover);
  }

  :active {
    color: var(--color-link-active);
  }
`

const List = styled.ul`
  margin: 0;
  padding-left: 0;
  list-style: none;

  > li {
    position: relative;
    padding-left: 15px;

    ::before {
      content: '';
      position: absolute;
      top: 50%;
      left: 0;
      transform: translateY(-50%);
      display: block;
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: var(--color-primary-2) linear-gradient(48deg, var(--color-primary-2) 0%, var(--color-primary-3) 100%);
    }

    + li {
      margin-top: 4px;
    }
  }
`

const TitleSection = styled.h3`
  margin-top: 0;
  margin-bottom: 10px;
  font-size: 24px;
  line-height: 1.5;
  font-weight: 500;
  letter-spacing: 0.02em;
  color: var(--color-primary);
`

const AvatarWrapper = styled.div`
  width: 150px;
  height: 150px;
  margin-bottom: 8px;
`

const Avatar = styled.img`
  max-width: 150px;
`

const UserName = styled.h2`
  margin-top: 0;
  margin-bottom: 14px;
  font-size: 32px;
  line-height: 1.4;
  font-weight: 600;
  letter-spacing: 0.02em;
  color: var(--color-primary);

  small {
    display: block;
    font-size: 0.5em;
    font-weight: 300;
    color: var(--color-default);
  }
`

const UserBio = styled.h6`
  margin: 0 0 5px;
  font-size: 14px;
  line-height: 1.4;
  font-weight: 400;
  letter-spacing: 0.02em;

  strong {
    font-weight: 500;
    color: var(--color-primary);
  }
`

const UserFollow = styled(UserBio)`
  margin-top: 2px;
`

const TitleNotFound = styled.h2`
  margin-top: 0;
  margin-bottom: 0;
  padding-top: 180px;
  padding-bottom: 50px;
  font-family: var(--font);
  font-size: 30px;
  font-weight: 500;
  line-height: 1.125;
  text-align: center;
  color: var(--color-primary);

  ::after {
    content: '';
    display: block;
    margin: 27px auto 34px;
    width: 60px;
    height: 3px;
    background: var(--color-primary-2) linear-gradient(90deg, var(--color-primary-2) 0%, var(--color-primary-3) 100%);
  }

  @media (min-width: 800px) {
    font-size: 40px;
  }
`

class ProfileGitHubV2 extends Component {
  static propTypes = {
    user: PropTypes.string.isRequired
  }

  state = {
    user: {},
    repos: [],
    gists: [],
    followers: [],
    subscriptions: [],
    loading: false,
    loaded: false,
    fail: false
  }

  componentDidMount () {
    this.getData(this.props.user)
  }

  componentWillReceiveProps ({user}) {
    if (this.props.user !== user) this.getData(user)
  }

  getData (userFetch) {
    this.setState({
      loading: true
    })

    const callbackFetch = response => {
      if (response.ok) return response.json()

      throw new TypeError(`STATUS: ${response.status} URL: ${response.url}`)
    }

    Promise.props({
      user: fetch(`https://api.github.com/users/${userFetch}`).then(callbackFetch),
      repos: fetch(`https://api.github.com/users/${userFetch}/repos`).then(callbackFetch),
      gists: fetch(`https://api.github.com/users/${userFetch}/gists`).then(callbackFetch),
      followers: fetch(`https://api.github.com/users/${userFetch}/followers`).then(callbackFetch),
      subscriptions: fetch(`https://api.github.com/users/${userFetch}/subscriptions`).then(callbackFetch),
    }).then(data => {
      this.setState({
        user: data.user,
        repos: data.repos,
        gists: data.gists,
        followers: data.followers,
        subscriptions: data.subscriptions,
        loading: false,
        loaded: true,
        fail: false
      })
    }).catch(error => {
      console.error(error)

      this.setState({
        loading: false,
        loaded: false,
        fail: true
      })
    })
  }

  getUser () {
    const {name, login, avatar_url, html_url, followers, following, bio} = this.state.user

    let userName = null

    if (name) {
      userName = (
        <Fragment>
          <Link href={html_url} target="_blank" aria-label="User name: ">
            {name}
          </Link>
          <small aria-label="User login: ">({login})</small>
        </Fragment>)
    } else {
      userName = (<Link href={html_url} target="_blank" aria-label="User login: ">{login}</Link>)
    }

    return (
      <div>
        <AvatarWrapper>
          <Avatar src={avatar_url} alt="Avatar user" />
        </AvatarWrapper>
        <UserName>
          {userName}
        </UserName>
        {bio ? <UserBio><strong>Bio:</strong> {bio}</UserBio> : null}
        <UserFollow>
          <strong>Followers:</strong> {followers}<strong> / Following:</strong> {following}
        </UserFollow>
      </div>
    )
  }

  reposList (maxElement = this.state.repos.length) {
    if (this.state.repos.length) {
      const elements = this.state.repos.slice(0, maxElement).map(item => {
        return (
          <li key={item.id}>
            <Link href={item.html_url} target="_blank">{item.name}</Link>
            {item.fork ? <IconFork className={css({marginLeft: '7px'})} fill={'var(--color-default)'} /> : null}
          </li>
        )
      })

      return <List>{elements}</List>
    }

    return 'No repositories'
  }

  gistList (maxElement = this.state.gists.length) {
    if (this.state.gists.length) {
      const elements = this.state.gists.slice(0, maxElement).map(item => {
        let name = null

        if (item.description) {
          name = item.description
        } else {
          const filesNames = Object.values(item.files).reduce((acc, curr) => {
            if (typeof curr === 'object' && curr !== null) return [...acc, curr.filename]
          }, [])

          name = `Files: ${filesNames.join(', ')}`
        }

        return (
          <li key={item.id}>
            <Link href={item.html_url} target="_blank">{name}</Link>
            {!item.public ? <IconSecret className={css({marginLeft: '7px'})} fill={'var(--color-default)'} /> : null}
          </li>
        )
      })

      return <List>{elements}</List>
    }

    return 'No gists'
  }

  subscriptionList (maxElement = this.state.subscriptions.length) {
    if (this.state.subscriptions.length) {
      const arr = this.state.subscriptions
        .sort((prev, next) => Date.parse(prev.created_at) > Date.parse(next.created_at) ? -1 : 1).slice(0, maxElement)

      const elements = arr.map(item => {
        return (
          <li key={item.id}>
            <Link href={item.html_url} target="_blank">{item.name}</Link>
            {item.fork ? <IconFork className={css({marginLeft: '7px'})} fill={'var(--color-default)'} /> : null}
          </li>
        )
      })

      return <List>{elements}</List>
    }

    return 'No subscriptions'
  }

  render () {
    const {loading, fail} = this.state

    if (loading) return (<PreloaderPage fill='#eee' />)
    if (fail) return (<ProfileGitHubWrapper>
      <TitleNotFound>Sorry, but page was not found</TitleNotFound>
    </ProfileGitHubWrapper>)

    return (
      <ProfileGitHubWrapper aria-label="Section Profile GitHub">
        <Header>
          {this.getUser()}
        </Header>
        <Body>
          <div>
            <TitleSection>Repositories</TitleSection>
            {this.reposList()}
          </div>
          <div>
            <TitleSection>Gists</TitleSection>
            {this.gistList()}
          </div>
          <div>
            <TitleSection>Subscriptions</TitleSection>
            {this.subscriptionList(10)}
          </div>
        </Body>
      </ProfileGitHubWrapper>
    )
  }
}

export default ProfileGitHubV2
