import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import api from '../../services/api';
import { Container } from '../../components/conteiner';
import { Footer } from '../../components/footer';

import { Loading, Owner, Repositories } from './styles';
import GetSumary from './service';

const User = ({ match }) => {
    const [profile, setProfile] = useState('');
    const [sumary, setSumary] = useState('');
    const [repos, setRepos] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        async function fetchData() {
            const loginEncode = match.params.login;
            setLoading(true);
            const [resultProfile, resultRepos] = await Promise.all([
                api.get(`/users/${loginEncode}`),
                api.get(`/users/${loginEncode}/repos`),
            ]);
            const resultSumary = GetSumary(resultRepos);
            setSumary(resultSumary);
            setProfile(resultProfile.data);
            setRepos(resultRepos.data);
            setLoading(false);
        }
        fetchData();
    }, []);

    if (loading) {
        return <Loading>Carregando</Loading>;
    }

    return (
        <Container>
            <Owner>
                <Link to="/">Voltar para a busca</Link>
                <img src={profile.avatar_url} alt={profile.login} />
                <h1>{profile.login}</h1>
                <p>
                    Nome: <strong>{profile.name}</strong>
                </p>
                <p>
                    Bio: <strong>{profile.bio}</strong>
                </p>
                <p>
                    Localidade: <strong>{profile.location}</strong>
                </p>
            </Owner>
            <Repositories>
                <h1>Repositórios</h1>
                <p>
                    Tamanho total: <strong>{sumary.size} bytes</strong>
                </p>
                <p>
                    Linguagens:{' '}
                    {sumary.arrayLanguage &&
                        sumary.arrayLanguage.map((lang) => (
                            <strong
                                key={String(lang.name)}
                            >{`${lang.name}(${lang.counts}), `}</strong>
                        ))}
                </p>
                <p>
                    Issues abertos: <strong>{sumary.openIssuesCount}</strong>
                </p>
                <ul>
                    {repos.map((repo) => (
                        <li key={String(repo.id)}>
                            <div>
                                <h1>{repo.name}</h1>
                                <p>{repo.description}</p>
                                <p>
                                    Tamanho{' '}
                                    <strong>{`${repo.size} bytes`}</strong> |
                                    Linguagem <strong>{repo.language}</strong> |
                                    Issues abertos{' '}
                                    <strong>{repo.open_issues_count}</strong>{' '}
                                </p>
                            </div>
                        </li>
                    ))}
                </ul>
            </Repositories>
            <Footer>
                <p>2020 - Desenvolvido por Robert</p>
            </Footer>
        </Container>
    );
};

User.propTypes = {
    match: PropTypes.shape({
        params: PropTypes.shape({
            login: PropTypes.string,
        }),
    }).isRequired,
};

export default User;
