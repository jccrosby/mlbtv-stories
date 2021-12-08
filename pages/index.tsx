import type { NextPage, NextPageContext } from 'next';
import { DateTime } from 'luxon';
import fetch from 'isomorphic-fetch';
import { Hint, SeasonLink, SeasonListItem, SeasonUnorderedList } from '../styles/index.styles';

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
            'amp-date-picker': any;
        }
    }
}

export async function getStaticProps(context: NextPageContext) {
    const currentDate = DateTime.now();
    const response = await fetch('https://statsapi.mlb.com/api/v1/seasons/all?sportId=1');
    const responseJson = await response.json();
    let seasons = responseJson?.seasons ?? [];
    seasons = seasons.filter((season: ISeason) => {
        const startDate = DateTime.fromISO(season.regularSeasonStartDate);
        const diffDays = startDate.diff(currentDate, 'days').toObject().days || 0;
        return diffDays <= 0;
    });
    const season: ISeason = seasons[seasons.length - 1];

    const seasonEndDate = DateTime.fromISO(season.postSeasonEndDate);
    let endDate = currentDate;

    if (currentDate > seasonEndDate) {
        endDate = seasonEndDate;
    }

    const daysUrl = `https://statsapi.mlb.com/api/v1/schedule?sportId=1&startDate=${endDate
        .plus({ days: -31 })
        .toISODate()}&endDate=${endDate.toISODate()}`;
    const daysResponse = await fetch(daysUrl);
    const daysJson = await daysResponse.json();
    let dates = daysJson.dates;
    dates = dates.sort((dateA: any, dateB: any) => {
        const a = DateTime.fromISO(dateA.date);
        const b = DateTime.fromISO(dateB.date);
        if (a < b) {
            return 1;
        } else if (a > b) {
            return -1;
        } else {
            return 0;
        }
    });

    return { props: { dates } };
}

export interface ISeason {
    seasonId: string;
    preSeasonStartDate: string;
    preSeasonEndDate: string;
    postSeasonStartDate: string;
    postSeasonEndDate: string;
    regularSeasonStartDate: string;
    regularSeasonEndDate: string;
    seasonStartDate: string;
    seasonEndDate: string;
}
export interface HomeProps {
    dates: any[];
}

const Home: NextPage<HomeProps> = ({ dates }) => {
    return (
        <SeasonUnorderedList>
            {dates.map((date: any) => {
                return (
                    <SeasonListItem key={`game-date-${date.date}`}>
                        <SeasonLink href={`/days/${date.date}`}>
                            {DateTime.fromISO(date.date).toLocaleString(DateTime.DATE_MED)}
                        </SeasonLink>
                    </SeasonListItem>
                );
            })}
        </SeasonUnorderedList>
    );
};

export default Home;
