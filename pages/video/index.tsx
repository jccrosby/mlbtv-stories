import type { NextPage, NextPageContext } from 'next';
import Head from 'next/head';

export const config = { amp: true };

declare global {
    namespace JSX {
        interface IntrinsicElements {
            'amp-story': any;
            'amp-img': any;
            'amp-story-page': any;
            'amp-story-grid-layer': any;
            'amp-video': any;
            'amp-story-animation': any;
            'amp-animation': any;
        }
    }
}

export interface VideoPlayerProps {
    games: any[];
}

const VideoPlayer: NextPage<VideoPlayerProps> = () => {
    return (
        <>
            <amp-story
                standalone='standalone'
                title='Games for today'
                publisher='John Crosby'
                publisher-logo-src='https://example.com/logo/1x1.png'
                poster-portrait-src='https://www.fillmurray.com/720/1280'
            >
                <amp-story-page id='video-sample'>
                    <amp-story-grid-layer template='fill' className='video-container'>
                        <div id='video-hint'>Rotate for fullscreen</div>
                        <amp-video
                            width='480'
                            height='270'
                            src='https://amp.dev/static/samples/video/tokyo.mp4'
                            poster='https://amp.dev/static/samples/img/tokyo.jpg'
                            layout='responsive'
                            autoPlay='autoplay'
                        ></amp-video>
                    </amp-story-grid-layer>
                </amp-story-page>
            </amp-story>
        </>
    );
};

export default VideoPlayer;
