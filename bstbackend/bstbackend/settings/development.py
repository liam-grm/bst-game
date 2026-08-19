from django.core.exceptions import ImproperlyConfigured

from .base import *  # noqa: F403

DEBUG = True

ALLOWED_HOSTS = ['localhost', '127.0.0.1']

postgres = postgres_database()  # noqa: F405
if postgres is None:
    raise ImproperlyConfigured(
        'Local dev uses PostgreSQL. Copy .env.example to .env, then run: docker compose up -d',
    )

DATABASES = {
    'default': postgres,
}

CORS_ALLOWED_ORIGINS = [
    'http://localhost:5173',
    'http://127.0.0.1:5173',
]
