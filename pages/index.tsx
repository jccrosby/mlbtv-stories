import type { NextPage, NextPageContext } from 'next';
import { DateTime } from 'luxon';
import fetch from 'isomorphic-fetch';
import { Hint } from '../styles/index.styles';

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
            'amp-date-display': any;
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
            date: DateTime.fromISO(game.officialDate).toFormat('M/d/yyyy'),
            title: `${game.teams.away.team.name} @ ${game.teams.home.team.name}`,
            image: condensedGame?.image?.templateUrl?.replace(
                '{formatInstructions}',
                'w_720,h_1280,f_jpg,c_fill',
            ),
            description: dailyRecap?.description,
            mp4: dailyRecap?.playbacks.find((playback: any) => playback.name === 'mp4Avc'),
        };
        return updatedGame;
    });
    return { props: { games } };
}

const getGames = (game: any) => {
    const logoSize = 90;
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
                    <h2 grid-area='upper-third'>{game.matchupData.description}</h2>
                    <div grid-area='middle-third'>
                        <div style={{ display: 'flex', margin: '15px' }}>
                            <amp-img
                                src={`https://img.mlbstatic.com/mlb-photos/image/upload/w_144,h_144,c_pad/u_team:${game.teams.away.team.id}:fill:spot,ar_1:1,w_240/r_max,f_png,q_auto:best/v1/team/${game.teams.away.team.id}/logo/spot/current`}
                                width={logoSize}
                                height={logoSize}
                                layout='fixed'
                                alt={`Home team: ${game.teams.home.team.name}`}
                            ></amp-img>
                            <div style={{ padding: '15px 10px', textAlign: 'left' }}>
                                <h3>Score: {game.teams.away.score}</h3>
                                <hr />
                                <h4>
                                    W: {game.teams.away.leagueRecord.wins} | L:
                                    {game.teams.away.leagueRecord.losses}
                                </h4>
                            </div>
                        </div>
                        <div style={{ display: 'flex', padding: '15px' }}>
                            <amp-img
                                src={`https://img.mlbstatic.com/mlb-photos/image/upload/w_144,h_144,c_pad/u_team:${game.teams.home.team.id}:fill:spot,ar_1:1,w_240/r_max,f_png,q_auto:best/v1/team/${game.teams.home.team.id}/logo/spot/current`}
                                width={logoSize}
                                height={logoSize}
                                layout='fixed'
                                alt={`Away team: ${game.teams.away.team.name}`}
                            ></amp-img>
                            <div style={{ padding: '15px 10px', textAlign: 'left' }}>
                                <h3>Score: {game.teams.home.score}</h3>
                                <hr />
                                <h4>
                                    W: {game.teams.home.leagueRecord.wins} | L:{' '}
                                    {game.teams.home.leagueRecord.losses}
                                </h4>
                            </div>
                        </div>
                    </div>
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
                        autoPlay='autoplay'
                        width='1280'
                        height='720'
                        layout='fill'
                    ></amp-video>
                </amp-story-grid-layer>
                <amp-story-grid-layer template='vertical'>
                    <h1>{game.matchupData.date}</h1>
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
        <amp-story
            standalone='standalone'
            title='Games for today'
            publisher='John Crosby'
            publisher-logo-src='https://example.com/logo/1x1.png'
            poster-portrait-src={games[0].matchupData.image}
        >
            {!!games ? games.map((game) => getGames(game)) : <p>Loading...</p>}
        </amp-story>
    );
};

export default Home;
