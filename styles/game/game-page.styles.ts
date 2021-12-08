import styled from 'styled-components';

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
    background: rgba(255, 255, 255, 0.8);
    color: white;
    padding: 10px 16px;
    /* Position on top of the video: */
    z-index: 100;
`;

export const VideoHint = styled.div`
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
    width: 100px;
`;
