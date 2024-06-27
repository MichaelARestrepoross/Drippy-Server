-- you do not need to seed users
-- you should run 'npm run db:init' to initialize the database
-- start your front and backends
-- instead now you should create users with firebase that will register also to your backend
-- when seeding other fields in other tables and you need the foreign key of user Id, retrieve the userIds from looking on postico or using psql
-- SELECT * from users 
-- manually place the id into your INSERT INTO values

-- Insert initial data into the users table
INSERT INTO users (uid, email, username, photo, created_at, updated_at)
VALUES 
    ('SH4DtzZfODOmpwAIqwEUOXqHdWt2', 'firstemail@gmail.com', 'first_user', '', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('SH4DtzZfODOmpwAIqwEUOXqHdWt2', 'fakeemail@gmail.com', 'second_user', '', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('IeERyMSGueavSqJioTrRpCYuMBo1', 'thirdemail@gmai.com', 'third_user', '', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
