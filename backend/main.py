from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from api.routers import router
from mangum import Mangum


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
    expose_headers=["Access-Control-Allow-Origin"]
)


app.include_router(router)


@app.get("/")
def read_root():
    return {"Hello": "from Ah Hao"}


"""
    Required for API Gateway Proxy Integration
"""


def handler(event, context):
    asgi_handler = Mangum(app)
    response = asgi_handler(event, context)

    response["headers"]["access-control-allow-origin"] = "*"
    response["headers"]["access-control-allow-credentials"] = "true"

    print(response["headers"])

    return response
