Local development
-----------------
>>> pip install -r requirements.txt
>>> copy .env.example .env
>>> docker compose up -d
>>> python manage.py migrate
>>> python manage.py runserver

Uses PostgreSQL via Docker (docker-compose.yml) and bstbackend.settings.development.
Matches production database engine (RDS Postgres on AWS).

To stop Postgres:
>>> docker compose down

To reset the database (deletes all local data):
>>> docker compose down -v
>>> docker compose up -d
>>> python manage.py migrate


Production (Elastic Beanstalk)
------------------------------
Set environment variables:
  SECRET_KEY
  ALLOWED_HOSTS          (comma-separated, e.g. yourdomain.com,.elasticbeanstalk.com)
  CORS_ALLOWED_ORIGINS   (optional if CloudFront serves /api on same domain)
  CSRF_TRUSTED_ORIGINS   (same as your HTTPS site origin)

PostgreSQL via RDS (auto when RDS is linked to EB):
  RDS_HOSTNAME, RDS_PORT, RDS_DB_NAME, RDS_USERNAME, RDS_PASSWORD

Deploy from this directory (bstbackend/):
>>> eb init
>>> eb create --platform "Python 3.10"
>>> eb deploy

Requires Python 3.10+ (Django 5.2 LTS). Uses bstbackend.settings.production and runs migrate on deploy.
