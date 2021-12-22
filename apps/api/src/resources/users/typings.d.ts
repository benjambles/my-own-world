declare namespace User {
    interface UserData {
        uuid: string;
        screenName: string;
        firstName: string;
        lastName: string;
        password?: string;
        identities: User.Identitfier[];
    }

    interface Identitfier {
        uuid: string;
        type: string;
        userId: string;
        identifier: string;
    }

    interface Request {
        user: User.UserData;
        identifier: {
            type: string;
            identity: string;
        };
    }
}
