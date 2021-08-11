export interface strToStr {
    (value: string): string;
}

export interface asyncStrToStr {
    (value: string): Promise<string>;
}
