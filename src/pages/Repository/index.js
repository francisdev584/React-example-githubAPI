import React, { Component } from 'react';
import PropTypes from 'prop-types';

import api from '../../services/api';

// import { Container } from './styles';

export default class Repository extends Component {
  state = {
    repository: {},
    issues: [],
    loading: true,
  };

  static propTypes = {
    match: PropTypes.shape({
      params: PropTypes.shape({
        repository: PropTypes.string,
      }),
    }).isRequired,
  };

  async componentDidMount() {
    const { match } = this.props;

    const reponame = decodeURIComponent(match.params.repository);

    const [repository, issues] = await Promise.all([
      api.get(`/repos/${reponame}`),
      api.get(`/repos/${reponame}/issues`, {
        params: {
          state: 'open',
          per_page: 5,
        },
      }),
    ]);

    this.setState({
      repository: repository.data,
      issues: issues.data,
      loading: false,
    });
  }

  render() {
    const { match } = this.props;
    return <h1>Repository: {decodeURIComponent(match.params.repository)}</h1>;
  }
}
