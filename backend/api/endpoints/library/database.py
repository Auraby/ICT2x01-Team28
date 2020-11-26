import typing
import boto3

dynamodb = boto3.resource('dynamodb', region_name="ap-southeast-1")


def test_connection() -> None:
    global dynamodb
    print(dynamodb.list_tables())


def dynamodb_select(query: typing.Dict, table: str) -> typing.Dict:
    global dynamodb

    if result := dynamodb.Table(table).get_item(
        Key=query,
        ConsistentRead=False,
        ReturnConsumedCapacity="NONE",
    ):
        return result["Item"] if "Item" in result.keys() else {}


def dynamodb_insert(item: typing.Dict, table: str) -> typing.Dict:
    global dynamodb

    return dynamodb.Table(table).put_item(
        Item=item
    )


def dynamodb_delete(item: typing.Dict, table: str) -> typing.Dict:
    global dynamodb

    return dynamodb.Table(table).delete_item(
        Key=item,
        ReturnValues="NONE",
        ReturnConsumedCapacity="NONE",
        ReturnItemCollectionMetrics="NONE"
    )
