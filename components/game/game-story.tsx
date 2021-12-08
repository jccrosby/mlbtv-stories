import { FC } from 'react';
import GamePage, { IGame } from './game-page';

export interface IGameStoryProps {
    games: IGame[];
    title: string;
    publisher: string;
    publisherLogoSrc: string;
    posterPortraitSrc: string;
}
const GameStory: FC<IGameStoryProps> = ({
    games,
    title,
    publisher,
    publisherLogoSrc,
    posterPortraitSrc,
}) => {
    return (
        <amp-story
            standalone='standalone'
            title={title}
            publisher={publisher}
            publisher-logo-src={publisherLogoSrc}
            poster-portrait-src={posterPortraitSrc}
        >
            {!!games.length ? (
                games.map((game) => <GamePage key={`game-page-${game.gamePk}`} game={game} />)
            ) : (
                <h1 style={{ textAlign: 'center', marginTop: 150 }}>No games for this day.</h1>
            )}
        </amp-story>
    );
};

export default GameStory;
