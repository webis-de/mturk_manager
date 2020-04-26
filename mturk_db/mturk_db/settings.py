"""
Django settings for mturk_db project.

Generated by 'django-admin startproject' using Django 2.0.

For more information on this file, see
https://docs.djangoproject.com/en/2.0/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/2.0/ref/settings/
"""

import os
import environ

env = environ.Env(
    # set casting, default value
    DEBUG=(bool, False),
    RABBITMQ_DEFAULT_USER=(str, 'guest'),
    RABBITMQ_DEFAULT_PASS=(str, 'guest'),
    # TODO: remove before deployment
    # DATABASE_URL=(str, 'postgres://user:password@localhost:5432/database'),
    DATABASE_URL=(str, 'postgres://{user}:{password}@db:5432/{database}'.format(
        user=os.environ.get('POSTGRES_USER', 'user'),
        password=os.environ.get('POSTGRES_PASSWORD', 'password'),
        database=os.environ.get('POSTGRES_DB', 'database'),
    )),
    # DATABASE_URL=(str, 'sqlite:///db.sqlite3'),
)

# Build paths inside the project like this: os.path.join(BASE_DIR, ...)
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))


# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/2.0/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = '++tc!-*2u!k+vkwj0(jx^7=4=lub%4!xr3tp^847f3t%px)gi='

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = env('DEBUG')

ALLOWED_HOSTS = ['*']

# Application definition

INSTALLED_APPS = [
    'api.apps.ApiConfig',
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'rest_framework',
    'rest_framework.authtoken',
    'corsheaders',
    'django_celery_results',
    'django_celery_beat',
    'graphene_django',
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
    # 'api.middleware.SqlPrintMiddleware',
]

ROOT_URLCONF = 'mturk_db.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'mturk_db.wsgi.application'


# Database
# https://docs.djangoproject.com/en/2.0/ref/settings/#databases
DATABASES = {
    'default': env.db()
}
# try:
#     DATABASES = os.environ.get('DATABASES')
# except AttributeError:
#     DATABASES = {
#     'default': {
#         'ENGINE': 'django.db.backends.sqlite3',
#         'NAME': os.path.join(BASE_DIR, 'db.sqlite3'),
#     }
# }


# Password validation
# https://docs.djangoproject.com/en/2.0/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]


# Internationalization
# https://docs.djangoproject.com/en/2.0/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_L10N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/2.0/howto/static-files/

STATIC_URL = '/static/'

CORS_ORIGIN_ALLOW_ALL = True

URL_MTURK_SANDBOX = 'https://mturk-requester-sandbox.us-east-1.amazonaws.com'

REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': (
        'rest_framework.authentication.TokenAuthentication',
    ),
    'DEFAULT_PERMISSION_CLASSES': (
        'mturk_db.permissions.AllowOptionsAuthentication',
    ),
    'DEFAULT_METADATA_CLASS': 'rest_framework.metadata.SimpleMetadata',

    'DEFAULT_PAGINATION_CLASS': 'api.helpers.CustomPagination',
    'PAGE_SIZE': 25,
    'PAGE_SIZE_QUERY_PARAM': 'page_size',
}

VERSION_PROJECT = 15

try:
    URL_BACKEND = os.environ.get('URL_BACKEND')
except AttributeError:
    URL_BACKEND = 'http://localhost:8004'

VERSION = os.environ.get('VERSION_MTURK_MANAGER')
PLACEHOLDER_SLUG_PROJECT = 'PLACEHOLDER_SLUG_PROJECT'

CELERY_BROKER_URL = 'amqp://{BROKER_USER}:{BROKER_PASSWORD}@rabbitmq:{BROKER_PORT}'.format(
    BROKER_USER=env('RABBITMQ_DEFAULT_USER'),
    BROKER_PASSWORD=env('RABBITMQ_DEFAULT_PASS'),
    BROKER_PORT=5672
)
CELERY_RESULT_BACKEND = 'django-db'
CELERY_TASK_TRACK_STARTED = True
CELERY_TIMEZONE = 'UTC'
CELERY_ENABLE_UTC = True
CELERY_BEAT_SCHEDULER = 'django_celery_beat.schedulers:DatabaseScheduler'
CELERY_TASK_SERIALIZER = 'pickle'
CELERY_RESULT_SERIALIZER = 'json'
# CELERY_EVENT_SERIALIZER = 'pickle'
CELERY_ACCEPT_CONTENT = ['pickle']
CELERY_WORKER_SEND_TASK_EVENTS = True

MTURK_KEY_ACCESS = os.environ.get('MTURK_ACCESS_KEY')
MTURK_KEY_SECRET = os.environ.get('MTURK_SECRET_KEY')

TOKEN_INSTANCE = os.environ.get('INSTANCE_TOKEN')
TOKEN_WORKER = os.environ.get('WORKER_TOKEN')

GRAPHENE = {
    'SCHEMA': 'mturk_db.schema.schema'
}
