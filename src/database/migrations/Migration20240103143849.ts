import { Migration } from '@mikro-orm/migrations';

export class Migration20240103143849 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table `users` (`id` text not null, `username` text not null, `password` text not null, `is_logged` integer not null default false, `salt` text not null default \'\', `created_at` text not null, primary key (`id`));');

    this.addSql('create table `notes` (`id` text not null, `title` text not null, `content` text not null, `owner_id` text not null, `created_at` datetime not null, `updated_at` datetime not null, constraint `notes_owner_id_foreign` foreign key(`owner_id`) references `users`(`id`) on delete cascade on update cascade, primary key (`id`));');
    this.addSql('create index `notes_owner_id_index` on `notes` (`owner_id`);');

    this.addSql('create table `notes_shared_with` (`note_id` text not null, `user_id` text not null, constraint `notes_shared_with_note_id_foreign` foreign key(`note_id`) references `notes`(`id`) on delete cascade on update cascade, constraint `notes_shared_with_user_id_foreign` foreign key(`user_id`) references `users`(`id`) on delete cascade on update cascade, primary key (`note_id`, `user_id`));');
    this.addSql('create index `notes_shared_with_note_id_index` on `notes_shared_with` (`note_id`);');
    this.addSql('create index `notes_shared_with_user_id_index` on `notes_shared_with` (`user_id`);');
  }

}
