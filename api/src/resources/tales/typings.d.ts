declare namespace Tale {
    interface TaleData extends Request {
        uuid: string;
        createdOn: Date;
        lastModifiedOn: Date;
        isDeleted: boolean;
    }

    interface Request {
        ownerId: string;
        name: string;
        summary: string;
        description: string;
        isDeleted: boolean;
    }
}
