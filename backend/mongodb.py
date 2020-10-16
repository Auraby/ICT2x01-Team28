import pymongo

class MongoDB:

    def __init__(self, url="mongodb://nosql.ict2x01.bitcarry.net:27017/", table="ict2x01"):
        
        self.client = pymongo.MongoClient(url)
        self.db = self.client["ict2x01"]
        self.col = self.db["modules"]