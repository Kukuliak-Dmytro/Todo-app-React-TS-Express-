create database todoApp;
use todoApp;

create table todoItems(
    id integer primary key auto_increment,
    title varchar(255) not null,
    content text not null,
    isCompleted boolean not null default false,
    -- even though I wrote tis last value, I DID not use it in the app
    isFailed boolean not null default false
);

insert into todoItems(title, content) values('Test Task', 'This is the test task');