export interface BaseDto {
	createdAt: Date;
	updatedAt: Date;
}

export type Dto<T> = T & BaseDto;
