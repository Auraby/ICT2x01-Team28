import pymongo
import typing


class MongoDB:

    """----------------------------------------------------------------------------------------------
    --- Constructor
    ----------------------------------------------------------------------------------------------"""

    def __init__(self, url="mongodb://root:toor@nosql.ict2x01.bitcarry.net:27017/", table_name="ict2x01"):

        self.client: pymongo.MongoClient = pymongo.MongoClient(url)
        self.db: pymongo.database.Database = self.client[table_name]

    """----------------------------------------------------------------------------------------------
    --- Destructor
    ----------------------------------------------------------------------------------------------"""

    def __del__(self) -> None:
        self.client.close()

    """----------------------------------------------------------------------------------------------
    --- Change table
    ----------------------------------------------------------------------------------------------"""

    def change_table(self, table_name: str) -> None:
        self.db: pymongo.database.Database = self.client[table_name]

    """----------------------------------------------------------------------------------------------
    --- Check if collection with collection_name exists
    ----------------------------------------------------------------------------------------------"""

    def collection_exists(self, collection_name: str) -> bool:
        return (collection_name in self.db.collection_names())

    """----------------------------------------------------------------------------------------------
    --- Check if collection with collection_name is empty (contains no documents)
    ----------------------------------------------------------------------------------------------"""

    def collection_empty(self, collection_name) -> bool:
        return self.db[collection_name].count_documents({}) == 0

    """----------------------------------------------------------------------------------------------
    --- Drop collection from database
    ----------------------------------------------------------------------------------------------"""

    def drop_collection(self, collection_name) -> bool:
        return self.db[collection_name].drop()

    """----------------------------------------------------------------------------------------------
    --- Insert record(s) into database
    ----------------------------------------------------------------------------------------------"""

    def insert(self, collection_name: str, data: typing.List) -> typing.List:

        if (isinstance(data, dict)):
            data = [data]

        result: list = self.db[collection_name].insert_many(data).inserted_ids
        ids: list = []

        for r in result:
            ids.append(str(r))

        return ids

    """----------------------------------------------------------------------------------------------
    --- Query from database
    ----------------------------------------------------------------------------------------------"""

    def select(self, collection_name: str, query: typing.Dict) -> typing.List:
        cursor: pymongo.cursor.Cursor = self.db[collection_name].find(query)
        result: typing.List = []

        for c in cursor:
            result.append(c)

        return result

    """----------------------------------------------------------------------------------------------
    --- Check if a document exists within collection
    ----------------------------------------------------------------------------------------------"""

    def exists(self, collection_name: str, query: typing.Dict) -> bool:
        return bool(self.select_one(collection_name, query))

    """----------------------------------------------------------------------------------------------
    --- Delete any document matching query from collection (Batch delete)
    ----------------------------------------------------------------------------------------------"""

    def delete_many(self, collection_name: str, query: typing.Dict) -> int:

        if query == {}:
            print("Query cannot be empty dict. Use delete_all() to delete all documents.")
            return 0

        return self.db[collection_name].delete_many(query).deleted_count

    """----------------------------------------------------------------------------------------------
    --- Deletes all document from collection
    ----------------------------------------------------------------------------------------------"""

    def delete_all(self, collection_name: str) -> int:
        return self.db[collection_name].delete_many({}).deleted_count

    """----------------------------------------------------------------------------------------------
    --- Update target document with new values
    ----------------------------------------------------------------------------------------------"""

    def update_one(self, collection_name: str, target: typing.Dict, new: typing.Dict) -> int:
        return self.db[collection_name].update_one(target, new).modified_count

    """----------------------------------------------------------------------------------------------
    --- Updates all document matching query with new values
    ----------------------------------------------------------------------------------------------"""

    def update_many(self, collection_name: str, query: typing.Dict, new: typing.Dict) -> int:
        return self.db[collection_name].update_many(query, new).modified_count
