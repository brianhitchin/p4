from flask.cli import AppGroup
from app.models.db import db, environment, SCHEMA
from app.models import User, Exercise, Story, Topic, CommentE, CommentS, Membership, Group
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

def seed_groups():
    g1 = Group(
        creatorId=1, topicId=1, title='Washington support group')
    g2 = Group(
        creatorId=2, topicId=2, title='Cupid mental health clinic')
    g3 = Group(
        creatorId=3, topicId=1, title='NA public facility')

    db.session.add(g1)
    db.session.add(g2)
    db.session.add(g3)
    db.session.commit()

def undo_groups():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.groups RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM stories"))
        
    db.session.commit()

def seed_topics():
    depression = Topic(topic="Depression", creatorId=1)
    anxiety = Topic(topic="Anxiety", creatorId=2)
    db.session.add(depression)
    db.session.add(anxiety)
    db.session.commit()

def undo_topics():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.topics RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM topics"))
        
    db.session.commit()

def seed_comments():
    comment1 = CommentS(
        creatorId=1, storyId=3, body='I like it! Keep it up!', rating=5)
    comment2 = CommentS(
        creatorId=2, storyId=1, body='Great work! Post more please :)', rating=4)
    comment3 = CommentS(
        creatorId=3, storyId=2, body='Very average post, I must confess. Hence the very average score.', rating=3)
    comment4 = CommentS(
        creatorId=1, storyId=2, body='I might be in a bad mood.', rating=2)
    comment5 = CommentS(
        creatorId=2, storyId=3, body='I usually do not give out 5 often, but I think this post deserved it.', rating=5)
    comment6 = CommentS(
        creatorId=3, storyId=1, body='Whoever the dev is really needs to implement subscription system....', rating=4)

    db.session.add(comment1)
    db.session.add(comment2)
    db.session.add(comment3)
    db.session.add(comment4)
    db.session.add(comment5)
    db.session.add(comment6)
    db.session.commit()

def undo_comments():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.comments RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM exercises"))
        
    db.session.commit()

def seed_commente():
    comment7 = CommentE(
        creatorId=1, exerciseId=3, body='What is after like?', rating=3)
    comment8 = CommentE(
        creatorId=2, exerciseId=1, body='this is great. My back has been hurting. I might give it a go.', rating=3)
    comment9 = CommentE(
        creatorId=3, exerciseId=2, body='Exceptional. Splendid. Magnificent. Need I go on more?', rating=5)
    comment10 = CommentE(
        creatorId=1, exerciseId=2, body='I might be in a great mood.', rating=5)
    comment11 = CommentE(
        creatorId=2, exerciseId=3, body='I deeply regret reading this. Unfortunately my house is not equipped with a eye wash station.', rating=1)
    comment12 = CommentE(
        creatorId=3, exerciseId=1, body='Thanks! This was pretty good!', rating=4)

    db.session.add(comment7)
    db.session.add(comment8)
    db.session.add(comment9)
    db.session.add(comment10)
    db.session.add(comment11)
    db.session.add(comment12)
    db.session.commit()

def undo_commente():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.commente RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM exercises"))
        
    db.session.commit()

def seed_memberships():
    m1 = Membership(
        userId=1, groupId=1, role='Admin')
    m2 = Membership(
        userId=2, groupId=2, role='Admin')
    m3 = Membership(
        userId=3, groupId=3, role='Admin')

    db.session.add(m1)
    db.session.add(m2)
    db.session.add(m3)
    db.session.commit()

def undo_memberships():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.memberships RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM stories"))
        
    db.session.commit()

# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    if environment == 'production':
        # Before seeding, truncate all tables prefixed with schema name
        undo_commente()
        undo_comments()
        undo_memberships()
        undo_groups()
        undo_stories()
        undo_exercises()
        undo_topics()
        undo_users()
        # Add a truncate command here for every table that will be seeded.
        db.session.commit()
    seed_users()
    seed_topics()
    seed_exercises()
    seed_stories()
    seed_groups()
    seed_memberships()
    seed_comments()
    seed_commente()
    # Add other seed functions here


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
        undo_commente()
        undo_comments()
        undo_memberships()
        undo_groups()
        undo_stories()
        undo_exercises()
        undo_topics()
        undo_users()
    # Add other undo functions here