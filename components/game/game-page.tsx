import { FC } from 'react';
import { Hint, VideoHint } from '../../styles/game/game-page.styles';

export interface IGame {
    gamePk: string;
    matchupData: { [key: string]: any };
    teams: { [key: string]: any };
}

export interface IGamePageProps {
    game: IGame;
}

const GamePage: FC<IGamePageProps> = ({ game }) => {
    const logoSize = 90;

    return (
        <>
            <amp-story-page id={`condensed-game-${game.gamePk}`}>
                <amp-story-grid-layer template='fill'>
                    {!!game?.matchupData?.image ? (
                        <amp-img
                            src={game.matchupData.image}
                            width='720'
                            height='1280'
                            layout='responsive'
                            alt='...'
                            class='image-scrim'
                        ></amp-img>
                    ) : null}
                </amp-story-grid-layer>

                <amp-story-grid-layer template='thirds'>
                    <h2 grid-area='upper-third'>{game?.matchupData?.description ?? ''}</h2>
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
                <amp-story-grid-layer template='vertical'>
                    <VideoHint>{game.matchupData.date}</VideoHint>
                </amp-story-grid-layer>
            </amp-story-page>

            {!!game?.matchupData?.mp4 ? (
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
                        <VideoHint>{game.matchupData.date}</VideoHint>
                    </amp-story-grid-layer>
                </amp-story-page>
            ) : null}
        </>
    );
};

export default GamePage;
