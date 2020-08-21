import styled from 'styled-components';

export const Container = styled.div`
    max-width: 700px;
    background: #e5ddcb;
    border-radius: 4px;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
    padding: 30px;
    margin: 50px auto;

    h1 {
        font-size: 20px;
        color: #524656;
        display: flex;
        flex-direction: row;
        align-items: center;

        svg {
            margin-right: 10px;
        }
    }
`;
