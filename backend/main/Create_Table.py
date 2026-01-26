from db.base import Base
from db.session import engine

import db.models  

import asyncio

async def main():
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)

asyncio.run(main())
