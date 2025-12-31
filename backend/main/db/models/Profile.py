class Profile(Base):
    __tablename__ = "profiles"

    id: Mapped[int] = mapped_column(primary_key=True)
    user_id: Mapped[int] = mapped_column(
        ForeignKey("users.id", ondelete="CASCADE"),
        unique=True,
        nullable=False
    )

    full_name: Mapped[str] = mapped_column(String(100), nullable=False)
    avatar_url: Mapped[str] = mapped_column(String, nullable=True)
    target_exam: Mapped[str] = mapped_column(String, nullable=True)
    preparation_level: Mapped[str] = mapped_column(String, nullable=True)
    collage: Mapped[str] = mapped_column(String, nullable=True)
    branch: Mapped[str] = mapped_column(String, nullable=True)
    year_of_passing: Mapped[str] = mapped_column(String, nullable=True)
    
    

    user: Mapped["User"] = relationship(back_populates="profile")
