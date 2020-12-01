from typing import *
from boto3 import resource
from boto3.dynamodb.conditions import Key, Attr


dynamodb = resource('dynamodb', region_name="ap-southeast-1")


def test_connection() -> None:
    global dynamodb
    print(dynamodb.list_tables())


def dynamodb_select(query: Dict, table: str) -> Dict:
    global dynamodb

    if result := dynamodb.Table(table).get_item(
        Key=query,
        ConsistentRead=False,
        ReturnConsumedCapacity="NONE",
    ):
        return result["Item"] if "Item" in result.keys() else {}


def dynamodb_scan(query: Dict, table_name: str) -> List:
    global dynamodb

    if result := dynamodb.Table(table_name).scan(
        Select="ALL_ATTRIBUTES",
        ConsistentRead=False,
        FilterExpression=Attr(list(query.keys())[0]).eq(
            query[list(query.keys())[0]])
    ):
        return result["Items"] if "Items" in result.keys() else {}


def dynamodb_insert(item: Dict, table: str) -> Dict:
    global dynamodb

    return dynamodb.Table(table).put_item(
        Item=item
    )


def dynamodb_delete(item: Dict, table: str) -> Dict:
    global dynamodb

    return dynamodb.Table(table).delete_item(
        Key=item,
        ReturnValues="NONE",
        ReturnConsumedCapacity="NONE",
        ReturnItemCollectionMetrics="NONE"
    )


def dynamodb_query(query: Dict, table_name: str, index_name: str = None) -> List:
    global dynamodb

    if not index_name:
        result = dynamodb.Table(table_name).query(
            Select="ALL_ATTRIBUTES",
            KeyConditionExpression=Key(list(query.keys())[0]).eq(
                query[list(query.keys())[0]])
        )

    else:
        result = dynamodb.Table(table_name).query(
            IndexName=index_name,
            Select="ALL_ATTRIBUTES",
            KeyConditionExpression=Key(list(query.keys())[0]).eq(
                query[list(query.keys())[0]])
        )

    return result["Items"] if "Items" in result.keys() else []
