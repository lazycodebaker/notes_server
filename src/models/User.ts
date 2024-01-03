import { Collection, Entity, ManyToMany, OneToMany, PrimaryKey, Property } from "@mikro-orm/core";
import { TUser } from '../../type/user'
import { Note } from "./Note";
// import { Note } from "./Note";

interface IUser extends TUser {
    ownedNotes: Collection<Note>;
    sharedNotes: Collection<Note>;
}

@Entity({ tableName: "users" })
export class User implements IUser {
    @PrimaryKey({
        name: "id",
        type: "string",
        comment: "The unique identifier of the user",
    })
    id!: string;

    @Property({
        name: "username",
        type: "string",
        comment: "The username of the user",
    })
    username!: string;

    @Property({
        name: "password",
        type: "string",
        comment: "The password of the user",
    })
    password!: string;

    // One-to-Many relationship with Note for owned notes
    @OneToMany(() => Note, note => note.owner)
    ownedNotes = new Collection<Note>(this);

    // Many-to - Many relationship with Note for shared notes
    @ManyToMany(() => Note, note => note.sharedWith)
    sharedNotes = new Collection<Note>(this);

    @Property({
        name: "isLogged",
        type: "boolean",
        comment: "The login status of the user",
    })
    isLogged: boolean = false;

    @Property({
        name: "salt",
        type: "string",
        comment: "The salt of the user",
    })
    salt: string = "";

    @Property({
        name: "createdAt",
        type: "string",
        comment: "The date and time the user was created",
    })
    createdAt: Date = new Date();

    constructor(user: IUser) {
        Object.assign(this, user);
    }
}