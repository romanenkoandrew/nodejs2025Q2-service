export type Artist = {
    id: string;
    name: string;
    grammy: boolean;
}

export type CreateArtistDto = Omit<Artist, 'id'>;
