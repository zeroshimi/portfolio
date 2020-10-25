import uvicorn
from fastapi import FastAPI
from routers import root, users, items
# Cors設定用
from fastapi.middleware.cors import CORSMiddleware
from settings.cors import Cors


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=Cors.origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# home
app.include_router(root.router)

# items
app.include_router(items.router, prefix="/items", tags=["items"])
