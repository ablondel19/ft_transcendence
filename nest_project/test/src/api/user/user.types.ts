import { Exclude } from "class-transformer";
import { MatchHistoryDto } from "./user.dto";

export class SerializedUser {

	id!: number;

	name: string;

	email: string;
	@Exclude()
	password: string;

	isLogged: boolean;

	numberOfVictories: number;

	numberOfDefeats: number;

	VictoriesInARow: number;

	matchHistory: Array<MatchHistoryDto>;

	createdAt!: Date;

	updatedAt!: Date;

	constructor(partial: Partial<SerializedUser>) {
		Object.assign(this, partial);
	}
}