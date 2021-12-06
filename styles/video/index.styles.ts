import styled from 'styled-components';

export const Hint = styled.div`
    /* Position relative to its container: */
    position: absolute;
    right: 0;
    bottom: 25%;
    /* Typography: */
    line-height: 1;
    font-size: 13px;
    /* Borders, colors and sizing */
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.4);
    border-radius: 16px 0 0 16px;
    background: rgba(0, 0, 0, 0.8);
    color: white;
    padding: 10px 16px;
    /* Position on top of the video: */
    z-index: 100;
    /* Translate-x by 100% to displace out of view: */
    transform: translateX(100%);
    pointer-events: none;
    display: none;
`;

export {};
