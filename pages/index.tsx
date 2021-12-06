import type { NextPage, NextPageContext } from 'next';
import Head from 'next/head';
import fetch from 'isomorphic-fetch';

export const config = { amp: true };

declare global {
    namespace JSX {
        interface IntrinsicElements {
            'amp-story': any;
            'amp-img': any;
            'amp-story-page': any;
            'amp-story-grid-layer': any;
            'amp-video': any;
        }
    }
}

export async function getStaticProps(context: NextPageContext) {
    const response = await fetch(
        'https://statsapi.mlb.com/api/v1/schedule?sportId=1&date=2021-07-30&hydrate=game(content(media(all)))',
    );
    const json = await response.json();
    const gamesJson = json?.dates?.[0]?.games;
    const games = gamesJson.map((game: any) => {
        const updatedGame = { ...game };
        const dailyRecapItem = game.content?.media?.epgAlternate?.find((epgItem: any) => {
            return epgItem.title === 'Daily Recap';
        });
        const extendedHighlightItem = game.content?.media?.epgAlternate?.find((epgItem: any) => {
            return epgItem.title === 'Extended Highlights';
        });
        const dailyRecap = dailyRecapItem.items?.[0];
        const condensedGame = extendedHighlightItem.items?.[0];
        updatedGame.matchupData = {
            title: `${game.teams.away.team.name} @ ${game.teams.home.team.name}`,
            image: condensedGame?.image?.templateUrl?.replace(
                '{formatInstructions}',
                'h_1080,f_jpg,c_fill,g_auto',
            ),
            description: dailyRecap?.description,
            mp4: dailyRecap?.playbacks.find((playback: any) => playback.name === 'mp4Avc'),
        };
        return updatedGame;
    });
    return { props: { games } };
}

const getGames = (game: any) => {
    return (
        <>
            <amp-story-page id={`condensed-game-${game.gamePk}`}>
                <amp-story-grid-layer template='fill'>
                    <amp-img
                        src={game.matchupData.image}
                        width='720'
                        height='1280'
                        layout='responsive'
                        alt='...'
                        class='image-scrim'
                    ></amp-img>
                </amp-story-grid-layer>
                <amp-story-grid-layer template='thirds'>
                    <h1 grid-area='middle-third'>{game.matchupData.title}</h1>
                    <h3 grid-area='lower-third'>{game.matchupData.description}</h3>
                </amp-story-grid-layer>
            </amp-story-page>
            <amp-story-page
                id={`condensed-game-video-${game.gamePk}`}
                auto-advance-after={`video-mp4-${game.gamePk}`}
            >
                <amp-story-grid-layer template='fill'>
                    <amp-video
                        id={`video-mp4-${game.gamePk}`}
                        src={game.matchupData.mp4.url}
                        poster={game.matchupData.image}
                        autoplay='autoplay'
                        controls='controls'
                        rotate-to-fullscreen='rotate-to-fullscreen'
                        width='1280'
                        height='720'
                        layout='fill'
                    ></amp-video>
                </amp-story-grid-layer>
            </amp-story-page>
        </>
    );
};

export interface HomeProps {
    games: any[];
}

const Home: NextPage<HomeProps> = ({ games }) => {
    return (
        <>
            <amp-story
                standalone='standalone'
                title='Games for today'
                publisher='John Crosby'
                publisher-logo-src='https://example.com/logo/1x1.png'
                poster-portrait-src={games[0].matchupData.image}
            >
                {!!games ? games.map((game) => getGames(game)) : <p>Loading...</p>}
            </amp-story>
        </>
    );
};

export default Home;
