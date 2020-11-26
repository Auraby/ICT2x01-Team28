from fastapi import APIRouter
from .endpoints import ComponentAPI, UserAPI, FeedbackAPI, ModuleAPI

router = APIRouter()
router.include_router(UserAPI.router)
router.include_router(ModuleAPI.router)
router.include_router(FeedbackAPI.router)
router.include_router(ComponentAPI.router)
