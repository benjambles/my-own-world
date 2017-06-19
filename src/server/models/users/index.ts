interface UserData {
    id: string;
    screenName: string;
    firstName: string;
    lastName: string;
}

class User {

    constructor(private data: UserData) {

    }

    static async getUsers(pageNumber: number, pageCount: number): Promise<User[]> {
        let users = ['1', '2', '3', '4', '5'].map(await User.getUserById);

        return Promise.all(users);
    }

    static async createUser(data: UserData): Promise<User> {
        return new User(data);
    }

    static async getUserById(id: string): Promise<User> {
        let newUser: User = new User({
            id: id,
            screenName: "Shambles",
            firstName: "Ben",
            lastName: "Allen"
        });

        return newUser;
    }

    async update(data: UserData): Promise<User> {
        return this;
    }

    async delete(): Promise<boolean> {
        return true;
    }
}

export = User;