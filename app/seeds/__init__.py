from flask.cli import AppGroup
from app.models.db import db, environment, SCHEMA
from app.models import User, Exercise, Story, Topic
from sqlalchemy.sql import text

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')

def seed_users():
    demo = User(
        username='Demo', email='demo@aa.io', password='password', first_name='Demo', last_name='User')
    marnie = User(
        username='marnie', email='marnie@aa.io', password='password', first_name='Marnie', last_name='Jones')
    bobbie = User(
        username='bobbie', email='bobbie@aa.io', password='password', first_name='Bobbie', last_name='McGee')

    db.session.add(demo)
    db.session.add(marnie)
    db.session.add(bobbie)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_users():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM users"))
        
    db.session.commit()

def seed_exercises():
    workout = Exercise(
        creatorId=1, topicId=1, name='Working out', preview='See how working out helps with depression!', image_url='https://health.clevelandclinic.org/wp-content/uploads/sites/3/2022/04/exerciseHowOften-944015592-770x533-1.jpg',
        body="It temporarily boosts feel-good chemicals called endorphins. It may also have long-term benefits for people with depression. Regular exercise seems to encourage the brain to rewire itself in positive ways. How much exercise do you need? You do not need to run marathons to get a benefit. Just walking a few times a week can help.")
    goal = Exercise(
        creatorId=2, topicId=1, name='Setting Goals', preview='Set realistic goals!', image_url='https://cdn.shopify.com/s/files/1/0070/7032/files/AMgoal-setting_HEADER.jpg?v=1579623952',
        body="When you're depressed, you may feel like you can't accomplish anything. That makes you feel worse about yourself. To push back, set daily goals for yourself. Start very small, make your goal something that you can succeed at, like doing the dishes every other day.")
    meditate = Exercise(
        creatorId=3, topicId=2, name='Meditating', preview='Learn how to meditate to alleviate anxiety.', image_url='https://cdn.tinybuddha.com/wp-content/uploads/2013/07/Meditating-1.jpg',
        body="Meditation can give you a sense of calm, peace and balance that can benefit both your emotional well-being and your overall health. You can also use it to relax and cope with stress by refocusing your attention on something calming. Meditation can help you learn to stay centered and keep inner peace.")

    db.session.add(workout)
    db.session.add(goal)
    db.session.add(meditate)
    db.session.commit()

def undo_exercises():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.exercises RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM exercises"))
        
    db.session.commit()

def seed_stories():
    s1 = Story(
        creatorId=1, topicId=1, title='There is hope', mood=3, preview='There is light at the end of the tunnel.', image_url='https://springschristianacademy.ca/wp-content/uploads/2020/11/Hope-Theme-web-scaled.jpg',
        body="Life can seem like an unending journey with no end in sight. However, all things come to pass. Enduring is hard, you do not have to do it alone. Please reach out to anyone, your support group, and I promise soon you will be at the finish line.")
    s2 = Story(
        creatorId=2, topicId=2, title='How to deal with anxiety?', mood=2, preview='A question about anxiety.', image_url='https://www.solhapp.com/blog/storage/anxiety-concept-illustration-114360-8074.jpg',
        body="I am wondering how anyone else is dealing with anxiety? Mine is through the roof. Insecurity and self-doubt clouds my judgment and thought process everyday, and I am left helpless but to wonder about the uncertain future. I would appreciate any help.")
    s3 = Story(
        creatorId=3, topicId=2, title='No one right answer.', mood=6, preview='Like everything, anxiety is a multifaceted disease.', image_url='https://cdn.tinybuddha.com/wp-content/uploads/2013/07/Meditating-1.jpg',
        body="Often we struggle. We fail to figure out the root of our problem, and fail even harder in finding the solution. There is no one right solution! Anxiety is a complex disease, and as such, we need to take multiple approaches to address the issue. More to follow!")

    db.session.add(s1)
    db.session.add(s2)
    db.session.add(s3)
    db.session.commit()

def undo_stories():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.stories RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM stories"))
        
    db.session.commit()

def seed_topics():
    depression = Topic(topic="Depression")
    anxiety = Topic(topic="Anxiety")
    db.session.add(depression)
    db.session.add(anxiety)
    db.session.commit()

def undo_topics():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.topics RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM topics"))
        
    db.session.commit()


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    if environment == 'production':
        # Before seeding, truncate all tables prefixed with schema name
        undo_topics()
        undo_stories()
        undo_exercises()
        undo_users()
        # Add a truncate command here for every table that will be seeded.
        db.session.commit()
    seed_users()
    seed_exercises()
    seed_stories()
    seed_topics()
    # Add other seed functions here


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
        undo_topics()
        undo_stories()
        undo_exercises()
        undo_users()
    # Add other undo functions here