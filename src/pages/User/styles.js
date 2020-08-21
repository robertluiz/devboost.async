import styled from 'styled-components';

export const Loading = styled.div`
    color: #fff;
    font-size: 30px;
    font-weight: bold;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
`;

export const Owner = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;

    a {
        font-size: 16px;
        text-decoration: none;
    }

    img {
        width: 120px;
        border-radius: 50%;
        margin-top: 20px;
    }

    h1 {
        font-size: 24px;
        margin-top: 10px;
    }

    p {
        margin-top: 5px;
        font-size: 14px;
        line-height: 1.4;
        text-align: center;
    }
`;

export const Repositories = styled.div`
    margin-top: 30px;
    border-top: 1px solid #524656;

    h1 {
        font-size: 24px;
        margin-top: 15px;
        margin-bottom: 15px;
    }

    p {
        margin-top: 2px;
        font-size: 14px;
        line-height: 1.4;
    }

    ul {
        padding-top: 30px;
        margin-top: 30px;
        list-style: none;

        li {
            display: flex;
            align-items: center;
            padding: 15px 10px;
            border: 1px solid #524656;
            border-radius: 4px;
            h1 {
                margin-top: 0;
                font-size: 16px;
            }

            & + li {
                margin-top: 10px;
            }

            div {
                flex: 1;
            }
        }
    }
`;
