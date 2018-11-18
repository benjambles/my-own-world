declare namespace User {
    interface UserData {
        uuid: string;
        screenName: string;
        firstName: string;
        lastName: string;
        password: string;
    }

    interface Identitfier {
        uuid: string;
        type: string;
        identity: string;
        userId: string;
    }

    interface Request {
        user: User.UserData;
        identifier: {
            type: string;
            identity: string;
        };
    }
}
