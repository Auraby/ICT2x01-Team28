import typing
import boto3

dynamodb = boto3.resource(
    'dynamodb', endpoint_url="https://dynamodb.ap-southeast-1.amazonaws.com")


def test_connection() -> None:
    global dynamodb
    print(dynamodb.list_tables())


def select(query: typing.Dict, table: str) -> typing.Dict:
    global dynamodb

    if result := dynamodb.Table(table).get_item(
        Key=query,
        ConsistentRead=False,
        ReturnConsumedCapacity="NONE",
    ):
        return result["Item"] if "Item" in result.keys() else {}


def insert(item: typing.Dict, table: str) -> typing.Dict:
    global dynamodb

    return dynamodb.Table(table).put_item(
        Item=item
    )


def delete(item: typing.Dict, table: str) -> typing.Dict:
    global dynamodb

    return dynamodb.Table(table).delete_item(
        Key=item,
        ReturnValues="NONE",
        ReturnConsumedCapacity="NONE",
        ReturnItemCollectionMetrics="NONE"
    )
