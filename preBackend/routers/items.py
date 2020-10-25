from fastapi import APIRouter

router = APIRouter()

@router.get("/")
async def item_root():
    return "get Itmes"