import styled from 'styled-components';

export const Container = styled.div`
    padding: 0 2rem;
`;

export const Main = styled.main`
    //min-height: 100vh;
    padding: 4rem 0;
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

export const Title = styled.h1`
    text-align: center;
    margin: 0;
    line-height: 1.15;
    font-size: 4rem;
    a {
        color: #0070f3;
        text-decoration: none;
    }
    a:hover,
    a:focus,
    a:active {
        text-decoration: underline;
    }
`;

export const Description = styled.p`
    text-align: center;
`;

export const Grid = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    max-width: 800px;
    @media (max-width: 600px) {
        width: 100%;
        flex-direction: column;
    }
`;

export const Card = styled.a`
    margin: 1rem;
    padding: 1.5rem;
    text-align: left;
    color: inherit;
    text-decoration: none;
    border: 1px solid #eaeaea;
    border-radius: 10px;
    transition: color 0.15s ease, border-color 0.15s ease;
    max-width: 300px;
    :hover,
    :focus,
    :active {
        color: #0070f3;
        border-color: #0070f3;
    }
    h2 {
        margin: 0 0 1rem 0;
        font-size: 1.5rem;
    }
    p {
        margin: 0;
        font-size: 1.25rem;
        line-height: 1.5;
    }
`;

export const Footer = styled.footer`
    display: flex;
    flex: 1;
    padding: 2rem 0;
    border-top: 1px solid #eaeaea;
    justify-content: center;
    align-items: center;
    a {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-grow: 1;
    }
    :hover,
    :focus,
    :active {
        color: #0070f3;
    }
`;

export const Code = styled.code`
    background: #fafafa;
    border-radius: 5px;
    padding: 0.75rem;
    font-size: 1.1rem;
    font-family: Menlo, Monaco, Lucida Console, Liberation Mono, DejaVu Sans Mono,
        Bitstream Vera Sans Mono, Courier New, monospace;
`;

export const Logo = styled.span`
    height: 1em;
    margin-left: 0.5rem;
`;

export const Hint = styled.div`
    /* Position relative to its container: */
    position: absolute;
    left: 0;
    bottom: 1%;
    /* Typography: */
    line-height: 1;
    font-size: 13px;
    /* Borders, colors and sizing */
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.4);
    border-radius: 0 16px 16px 0;
    background: rgba(0, 0, 0, 0.8);
    color: white;
    padding: 10px 16px;
    /* Position on top of the video: */
    z-index: 100;
    /* Translate-x by 100% to displace out of view: */
    //transform: translateX(100%);
    //pointer-events: none;
    //display: none;
`;
