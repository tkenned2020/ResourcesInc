from app.models import db, MaterialDocumentations





# Adds material/documentation

def seed_materials():
    # Art = Subject(id=1)
    material1 = MaterialDocumentations(
        userId = 1,
        subjectId = 1,
        title = "What is art?",
        synopsis = "This article gives a high overview what art is",
        content = '''Art is a skill aquired by experience, study,
                    or observation. as an example 'the ART of making friends
                    comes with the experience of interacting with others and
                    observing behavior and how it effects the general atmosphere.
                    taking that knowledge into consideration and used to sharpen
                    your skill at picking up behavioral ques'

                    Art is the conscious use of skill and creative imagination
                    especially in the production of aesthetic objects;
                    such as painting a mural or sculptures molding
                    ''',
        created_at = "2021-07-21 4:45:34"
    )
    # Mathematics = Subject(id=2)
    material2 = MaterialDocumentations(
        userId = 2,
        subjectId = 2,
        title = "What is mathematics?",
        synopsis = "This article gives a high overview what Mathematics is",
        content = '''Mathematics is the science that deals with the logic of shape, quantity and arrangement. Math is all around us, in everything we do. It is the building block for everything in our daily lives, including mobile devices, architecture (ancient and modern), art, money, engineering, and even sports.
                    ''',
        created_at = "2021-07-21 5:35:14"
    )
    # Welding = Subject(id=3)
    material3 = MaterialDocumentations(
         userId = 1,
        subjectId = 3,
        title = "What is Welding?",
        synopsis = "This article gives a high overview what Welding is",
        content = '''Welding is a fabrication process whereby two or more parts are fused together by means of heat, pressure or both forming a join as the parts cool. Welding is usually used on metals and thermoplastics but can also be used on wood. The completed welded joint may be referred to as a weldment.''',
        created_at = "2021-07-21 5:35:14"
    )
    # Automotive = Subject(id=4)
    material4 = MaterialDocumentations(
        userId = 2,
        subjectId = 4,
        title = "What is Automotive?",
        synopsis = "This article gives a high overview what Automotive is",
        content = '''The definition of automotive is moved by a self-contained motor or engine or something that has to do with automobiles. A car is an example of something that is automotive.''',
        created_at = "2021-05-21 14:35:14"
    )
    # Psychology = Subject(id=5)
    material5 = MaterialDocumentations(
        userId = 1,
        subjectId = 5,
        title = "What is Psychology?",
        synopsis = "This article gives a high overview what Psychology is",
        content = '''Psychology is the scientific study of the mind and behavior. Psychologists are actively involved in studying and understanding mental processes, brain functions, and behavior. The field of psychology is considered a "Hub Science" with strong connections to the medical sciences, social sciences, and education (Boyack, Klavans, & Borner, 2005).''',
        created_at = "2021-01-21 1:59:24"
    )
    # Software_Development = Subject(id=6)
    material6 = MaterialDocumentations(
        userId = 2,
        subjectId = 6,
        title = "What is Software Development?",
        synopsis = "This article gives a high overview what Software Development is",
        content = '''Software development is the process that relates to the creation of individual software programs by using specialized and specific computer programming languages. This process is extremely comprehensive and varies depending on the type of software being developed; however, software development typically includes the conception, design, programming, testing, and bug fixing of a piece of software, network, or application.''',
        created_at = "2021-07-21 11:19:34"
    )
    # Construction = Subject(id=7)
    material7 = MaterialDocumentations(
        userId = 1,
        subjectId = 7,
        title = "What is Construction?",
        synopsis = "This article gives a high overview what Contruction is",
        content = '''Construction is a general term meaning the art and science to form objects, systems, or organizations,[1] and comes from Latin constructio (from com- "together" and struere "to pile up") and Old French construction.[2] To construct is the verb: the act of building, and the noun is construction: how something is built, the nature of its structure.''',
        created_at = "2021-12-21 15:39:39"
    )
    # Agriculture = Subject(id=8)
    material8 = MaterialDocumentations(
        userId = 2,
        subjectId = 8,
        title = "What is Agriculture?",
        synopsis = "This article gives a high overview what Agriculture is",
        content = '''Agriculture is the art and science of cultivating the soil, growing crops and raising livestock. It includes the preparation of plant and animal products for people to use and their distribution to markets.''',
        created_at = "2021-10-21 20:49:09"
    )

    materials = [material1,
                 material2,
                 material3,
                 material4,
                 material5,
                 material6,
                 material7,
                 material8,
    ]

    for material in materials:
        db.session.add(material)

    db.session.commit()

 # Uses a raw SQL query to TRUNCATE the categories table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_materials():
    db.session.execute('TRUNCATE material_documentations RESTART IDENTITY CASCADE;')
    db.session.commit()
