
import { Entity, PrimaryKey, Property, ManyToMany, Collection, ManyToOne } from "@mikro-orm/core";
import { User } from "./User";
import { TNote } from "../../type/note";

interface INote extends Omit<TNote, "sharedWith" | "owner"> {
    owner: User;
   sharedWith: Collection<User>;
}

@Entity({ tableName: "notes" })
export class Note implements INote {
    @PrimaryKey({
        name: "id",
        type: "string",
        comment: "The unique identifier of the note",
    })
    id!: string;

    @Property({
        name: "title",
        type: "string",
        comment: "The title of the note",
    })
    title!: string;

    @Property({
        name: "content",
        type: "string",
        comment: "The content of the note",
    })
    content!: string;

    @ManyToOne(() => User, { onDelete: 'cascade' }) // Adjust onDelete as needed
    owner!: User;

    // Many-to-Many relationship with User for sharing
    @ManyToMany(() => User, user => user.sharedNotes, { owner: true })
    sharedWith = new Collection<User>(this);
    
    @Property({
        name: "createdAt",
        type: "date",
        comment: "The date and time the note was created",
    })
    createdAt: Date = new Date();

    @Property({
        name: "updatedAt",
        type: "date",
        comment: "The date and time the note was last updated",
    })
    updatedAt: Date = new Date();

    constructor(note: INote) {
        Object.assign(this, note);
    }
}
