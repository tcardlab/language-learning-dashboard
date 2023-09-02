from extensions import db


class Chengyu(db.Model):
    """
    Database chengyu entry, which is randomly selected to be displayed.
    """

    id = db.Column(db.Integer, primary_key=True)

    word = db.Column(db.String, unique=True)
    pinyin = db.Column(db.String)
    abbreviation = db.Column(db.String)
    explanation = db.Column(db.String)
    example = db.Column(db.String)
    derivation = db.Column(db.String)

    def __init__(self, word, pinyin, abbreviation, explanation, example, derivation):
        self.word = word
        self.pinyin = pinyin
        self.abbreviation = abbreviation
        self.explanation = explanation
        self.example = example
        self.derivation = derivation