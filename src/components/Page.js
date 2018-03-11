import React, { Component } from 'react'
import styled from 'react-emotion'
import SearchUser from './SearchUser'
import ProfileGitHubV2 from './ProfileGitHubV2'

const PageWrapp = styled.div`
  overflow-x: hidden;
`

class Page extends Component {
  state = {
    searchUser: 'olegbilyk'
  }

  handleSearchUser = user => {
    this.setState({
      searchUser: user
    })
  }

  render () {
    return (
      <PageWrapp>
        <SearchUser handleSearchUser={this.handleSearchUser} />
        <ProfileGitHubV2 user={this.state.searchUser} />
      </PageWrapp>
    )
  }
}

export default Page
