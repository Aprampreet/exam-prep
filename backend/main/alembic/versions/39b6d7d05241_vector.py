"""vector

Revision ID: 39b6d7d05241
Revises: 42d849d2ecaf
Create Date: 2026-01-16 00:02:07.286749

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa
from pgvector.sqlalchemy import Vector


revision: str = '39b6d7d05241'
down_revision: Union[str, Sequence[str], None] = '42d849d2ecaf'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.alter_column(
        'document_chunks',
        'embedding',
        existing_type=Vector(1536),
        type_=Vector(3072),
        existing_nullable=True,
    )


def downgrade() -> None:
    op.alter_column(
        'document_chunks',
        'embedding',
        existing_type=Vector(3072),
        type_=Vector(1536),
        existing_nullable=True,
    )

