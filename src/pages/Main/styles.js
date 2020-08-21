import styled, { keyframes, css } from 'styled-components';
import { Link } from 'react-router-dom';

export const Form = styled.form`
    margin-top: 30px;
    display: flex;
    flex-direction: row;

    input {
        flex: 1;
        border: 1px solid #eee;
        padding: 10px 15px;
        border-radius: 4px;
        font-size: 16px;
    }
`;

const rotate = keyframes`
    from {
        transform: rotate(0deg);
    }

    to {
        transfrom: rotate(360deg);
    }

`;

export const SubmitButton = styled.button.attrs((props) => ({
    type: 'submit',
    disabled: JSON.parse(props.loading),
}))`
    background: #524656;
    border: 0;
    padding: 0 15px;
    margin-left: 10px;
    border-radius: 4px;
    display: flex;
    justify-items: center;
    align-items: center;

    &[disabled] {
        cursor: not-allowed;
        opacity: 0.6;
    }

    ${(props) =>
        props.loading &&
        css`
            svg {
                animation: ${rotate} 2s linear infinite;
            }
        `}
`;

export const ListLink = styled(Link)`
    display: flex;
    flex-direction: row;
    align-items: center;
    flex: 1;
    text-decoration: none;
`;

export const UserList = styled.ul`
    padding-top: 30px;
    margin-top: 30px;
    list-style: none;

    li {
        padding: 15px 10px;

        cursor: pointer;

        &:hover {
            opacity: 0.6;
            background: #f6eedc;
            border-radius: 4px;
        }

        & + li {
            border-top: 1px solid #524656;
        }
    }
    img {
        width: 56px;
        height: 56px;
        border-radius: 50%;
        border: 2px solid #eee;
    }
    div {
        flex: 1;
        margin-left: 15px;
        align-items: center;
        strong {
            color: #524656;
            font-size: 16px;
        }
    }
`;
