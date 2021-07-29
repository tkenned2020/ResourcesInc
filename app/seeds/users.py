from app.models import db, User


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        first_name = "Demo", last_name = "User", areas_of_interest = "none at the moment",  biography = "n/a", username='DemoUser', email='demo@ri.io', password='password')
    Jackson = User(
        first_name = "Jackson", last_name = "Williams", areas_of_interest = "aquatics and biochemistry", biography = "n/a", username='JacksonW21', email='jackson@ri.io', password='password')
    Marcus = User(
        first_name = "Marcus", last_name = "Ghant", areas_of_interest = "math and natural science", biography = "n/a", username='MarcusG44', email='marcus@ri.io', password='password')

    db.session.add(demo)
    db.session.add(Jackson)
    db.session.add(Marcus)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_users():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
