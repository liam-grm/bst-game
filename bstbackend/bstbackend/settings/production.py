from django.core.exceptions import ImproperlyConfigured

from .base import *  # noqa: F403

DEBUG = False

if SECRET_KEY == 'django-insecure-dev-only-change-in-production':  # noqa: F405
    raise ImproperlyConfigured('Set the SECRET_KEY environment variable in production.')

if not ALLOWED_HOSTS:  # noqa: F405
    raise ImproperlyConfigured('Set the ALLOWED_HOSTS environment variable in production.')

postgres = postgres_database()  # noqa: F405
if postgres is None:
    raise ImproperlyConfigured(
        'PostgreSQL is required in production. Set RDS_* or DB_* environment variables.',
    )

DATABASES = {
    'default': postgres,
}
