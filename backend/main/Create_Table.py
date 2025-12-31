from db.base import Base
from db.session import engine

# IMPORTANT: import models so SQLAlchemy knows about them
import db.models  # <-- THIS LINE IS THE FIX

import asyncio

async def main():
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)

asyncio.run(main())
