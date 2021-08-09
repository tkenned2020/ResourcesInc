from app.models import db, Comments





# Adds comments

def seed_comments():
    # Art = Subject(id=1)
    comment1 = Comments(
        userId = 1,
        material_documentationId = 1,
        comment = '''Art is a really cool. I always viewed it as a form of inner expression
                    ''',
        created_at = "2021-08-21 4:45:34"
    )
    # Mathematics = Subject(id=2)
    comment2 = Comments(
        userId = 2,
        material_documentationId = 2,
        comment = ''' could you list your citations?
                    ''',
        created_at = "2021-09-21 5:35:14"
    )
    # Welding = Subject(id=3)
    comment3 = Comments(
         userId = 1,
        material_documentationId = 3,
        comment = ''' My friend just got me on the welding train...Hope it works out for me ''',
        created_at = "2021-08-21 5:35:14"
    )
    # Automotive = Subject(id=4)
    comment4 = Comments(
        userId = 2,
        material_documentationId = 4,
        comment = ''' Do you have any resources on changing an alternator in a 2012 mazda tribute? ''',
        created_at = "2021-07-21 14:35:14"
    )
    # Psychology = Subject(id=5)
    comment5 = Comments(
        userId = 1,
        material_documentationId = 5,
        comment = '''Psychology is amazing. I also appreciate the in-text citation''',
        created_at = "2021-03-21 1:59:24"
    )
    # Software_Development = Subject(id=6)
    comment6 = Comments(
        userId = 2,
        material_documentationId = 6,
        comment = ''' what would the modern world be without software developers.''',
        created_at = "2021-08-21 11:19:34"
    )
    # Construction = Subject(id=7)
    comment7 = Comments(
        userId = 1,
        material_documentationId = 7,
        comment = ''' what type of salary can I make honing a specific skillset within construction...asking for a friend.''',
        created_at = "2022-1-21 15:39:39"
    )
    # Agriculture = Subject(id=8)
    comment8 = Comments(
        userId = 2,
        material_documentationId = 8,
        comment = '''Agriculture is an essential skill/tool to have.''',
        created_at = "2021-11-21 20:49:09"
    )

    comment9 = Comments(
        userId = 3,
        material_documentationId = 9,
        comment = '''can I comment on my own documentation as well?.''',
        created_at = "2020-11-21 20:49:09"
    )

    comments = [comment1,
                 comment2,
                 comment3,
                 comment4,
                 comment5,
                 comment6,
                 comment7,
                 comment8,
                 comment9,
    ]

    for comment in comments:
        db.session.add(comment)

    db.session.commit()

 # Uses a raw SQL query to TRUNCATE the categories table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_comments():
    db.session.execute('TRUNCATE material_documentations RESTART IDENTITY CASCADE;')
    db.session.commit()
