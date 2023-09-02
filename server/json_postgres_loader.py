import json
import sqlite3

from getDB import db_path

def runPopulate(): 
    with open('data/chengyu.json', encoding='utf-8') as f:
        data = json.load(f)

    con = sqlite3.connect(db_path)
    cur = con.cursor()

    # the format of chengyu.json is a list of dictionaries
    # example: {"derivation": "语出《法华经·法师功德品》下至阿鼻地狱。”", "example": "但也有少数意志薄弱的……逐步上当，终至堕入～。★《上饶集中营·炼狱杂记》", "explanation": "阿鼻梵语的译音，意译为无间”，即痛苦无有间断之意。常用来比喻黑暗的社会和严酷的牢狱。又比喻无法摆脱的极其痛苦的境地。", "pinyin": "ā bí dì yù", "word": "阿鼻地狱", "abbreviation": "abdy"}
    mapped = [
        (i, w['word'], w['pinyin'], w['abbreviation'], w['explanation'], w['example'], w['derivation'])
        for i, w in enumerate(data)
    ]
    cur.executemany(f"INSERT INTO chengyu VALUES(?, ?, ?, ?, ?, ?, ?)", mapped)

    con.commit()
    con.close()

if __name__ == "__main__":
    runPopulate()