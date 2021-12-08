import type { NextPage, NextPageContext } from 'next';
import { DateTime } from 'luxon';
import fetch from 'isomorphic-fetch';
import { useRouter } from 'next/router';
import GamePage from '../../components/game/game-page';
import GameStory from '../../components/game/game-story';

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

export interface IGamesStoryPageContext extends NextPageContext {
    params: { [key: string]: any };
}

export const getServerSideProps = async (context: IGamesStoryPageContext) => {
    const {
        params: { date },
    } = context;
    const wsEnd = DateTime.fromISO('2021-11-02');
    const current = DateTime.fromISO(date);
    const dateDiff = current.diff(wsEnd, 'days').toObject()?.days ?? 0;
    const theDate = dateDiff >= 0 ? wsEnd : current;
    let games = [];

    const response = await fetch(
        `https://statsapi.mlb.com/api/v1/schedule?sportId=1&date=${theDate.toISODate()}&hydrate=game(content(media(all))),linescore`,
    );
    const json = await response.json();
    if (parseInt(json.totalGames, 10) <= 0) {
        games = [];
    } else {
        const gamesJson = json?.dates?.[0]?.games;
        games = gamesJson?.map((game: any, index: number) => {
            const updatedGame = { ...game };
            const dailyRecapItem = game.content?.media?.epgAlternate?.find((epgItem: any) => {
                return epgItem.title === 'Daily Recap';
            });
            const extendedHighlightItem = game.content?.media?.epgAlternate?.find(
                (epgItem: any) => {
                    return epgItem.title === 'Extended Highlights';
                },
            );
            const dailyRecap = dailyRecapItem?.items?.[0];
            const condensedGame = extendedHighlightItem?.items?.[0];
            const imagePath = condensedGame?.image?.templateUrl ?? dailyRecap?.image?.templateUrl;
            const dailyRecapPlayback = dailyRecap?.playbacks?.find(
                (playback: any) => playback.name === 'mp4Avc',
            );
            const condensedGamePlayback = condensedGame?.playbacks?.find(
                (playback: any) => playback.name === 'mp4Avc',
            );
            updatedGame.matchupData = {
                index,
                date: DateTime.fromISO(game.officialDate).toFormat('M/d/yyyy'),
                title: `${game.teams.away.team.name} @ ${game.teams.home.team.name}`,
                image:
                    imagePath?.replace('{formatInstructions}', 'w_720,h_1280,f_jpg,c_fill') ?? '',
                description: dailyRecap?.description ?? condensedGame?.description ?? '',
                mp4: dailyRecapPlayback || condensedGamePlayback || null,
            };
            return updatedGame;
        });
    }

    return { props: { games } };
};

const getGame = (game: any) => {
    const logoSize = 90;
    return <GamePage game={game} />;
};

export interface HomeProps {
    games: any[];
    error: { [key: string]: any };
}

const Home: NextPage<HomeProps> = ({ games }) => {
    const router = useRouter();
    const {
        query: { date },
    } = router;
    const storyDate: string = !!date ? date.toString() : '2021-11-02';
    const posterSrc = games.find;
    return (
        <GameStory
            games={games}
            title={`MLB.TV Games for ${DateTime.fromISO(storyDate).toISODate()}`}
            publisher='John Crosby'
            publisherLogoSrc='https://www.jccrosby.com/playground/images/JCCROSBY-logo-1x1.png'
            posterPortraitSrc='https://www.jccrosby.com/playground/images/JCCROSBY-logo-portrait.png'
        />
    );
};

export default Home;
