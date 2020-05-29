declare namespace Project {
    interface ProjectData extends Request {
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
        baseLanguage: string;
        isDeleted: boolean;
    }
}
