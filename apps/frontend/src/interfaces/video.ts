export interface IVideo {
	readonly _id: string;
	readonly creator: string;
	readonly description: string;
	readonly genre: string;
	readonly id: string;
	readonly likeCounter: number;
	readonly title: string;
	readonly userliked: [_: string | null];
	readonly vidurl: string;
}
