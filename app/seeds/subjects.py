from app.models import db, Subjects




# Adds subjects

def seed_subjects():
    Art = Subjects(title="Art")
    Mathematics = Subjects(title="Mathematics")
    Welding = Subjects(title="Wielding")
    Automotive = Subjects(title="automotive")
    Psychology = Subjects(title="Psychology")
    Software_Development = Subjects(title="Software Development")
    Construction = Subjects(title="Construction")
    Agriculture = Subjects(title="Agriculture")


    subjects = [Art,
                Mathematics,
                Welding,
                Automotive,
                Psychology,
                Software_Development,
                Construction,
                Agriculture,
    ]

    for subject in subjects:
        db.session.add(subject)

    db.session.commit()

 # Uses a raw SQL query to TRUNCATE the categories table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_subjects():
    db.session.execute('TRUNCATE subjects RESTART IDENTITY CASCADE;')
    db.session.commit()
