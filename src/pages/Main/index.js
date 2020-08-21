import React, { useState, useEffect } from 'react';
import { FaTerminal, FaSearch, FaSpinner } from 'react-icons/fa';

import api from '../../services/api';
import { Container } from '../../components/conteiner';
import { Footer } from '../../components/footer';
import { Form, SubmitButton, UserList, ListLink } from './styles';

export default function Main() {
    const [inputSearch, setInputSearch] = useState('');
    const [users, setUsers] = useState([]);
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);

    // cache restore
    useEffect(() => {
        const cacheStorage = JSON.parse(localStorage.getItem('results'));
        if (cacheStorage) {
            setResults(cacheStorage);
            setUsers(cacheStorage.length > 0 ? cacheStorage[0].users : []);
        }
    }, []);

    // cache update
    useEffect(() => {
        return localStorage.setItem('results', JSON.stringify(results));
    }, [results]);

    const handleInputChange = (e) => {
        setInputSearch(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!inputSearch) return;

        setLoading(true);
        const term = inputSearch.trim().toLocaleLowerCase();
        const query = `/search/users?q=${encodeURIComponent(term)}`;

        const cache = results.filter((result) => result.query === query);

        if (cache && cache[0]) {
            const search = cache[0];
            setUsers(search.users);

            setResults([
                search,
                ...results.filter((result) => result.query !== query),
            ]);
        }

        if (!cache.length > 0) {
            const response = await api.get(query);
            setResults([
                {
                    query,
                    term,
                    users: response.data.items,
                },
                ...results.slice(0, 2),
            ]);
            setUsers(response.data.items);
        }

        setInputSearch('');
        setLoading(false);
    };

    return (
        <Container>
            <h1>
                <FaTerminal />
                Perfil Dev
            </h1>

            <Form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Procurar Usuário"
                    onChange={handleInputChange}
                    value={inputSearch}
                />
                <SubmitButton loading={loading.toString()}>
                    {loading ? (
                        <FaSpinner color="#FFF" size={14} />
                    ) : (
                        <FaSearch color="#FFF" size={14} />
                    )}
                </SubmitButton>
            </Form>

            <UserList>
                {users.map((user) => (
                    <li key={String(user.id)}>
                        <ListLink
                            to={`/user/${encodeURIComponent(user.login)}`}
                        >
                            <img src={user.avatar_url} alt={user.login} />
                            <div>
                                <strong>{user.login}</strong>
                            </div>
                        </ListLink>
                    </li>
                ))}
            </UserList>
            <Footer>
                <p>2020 - Desenvolvido por Robert</p>
            </Footer>
        </Container>
    );
}
