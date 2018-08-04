"""
Django settings for mturk project.

Generated by 'django-admin startproject' using Django 2.0.

For more information on this file, see
https://docs.djangoproject.com/en/2.0/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/2.0/ref/settings/
"""

import os
from django.conf import settings
from django.contrib.messages import constants as messages

import configparser
MESSAGE_TAGS = {
    messages.DEBUG: 'alert-info',
    messages.INFO: 'alert-info',
    messages.SUCCESS: 'alert-success',
    messages.WARNING: 'alert-warning',
    messages.ERROR: 'alert-danger',
}

# Build paths inside the project like this: os.path.join(BASE_DIR, ...)
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

URL_MTURK_SANDBOX = 'https://mturk-requester-sandbox.us-east-1.amazonaws.com'

# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/2.0/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = '=cq+#!^r^e59y_ob!!3)yd7cg-6!lcc31wh3a26oudip#_h5gk'

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

ALLOWED_HOSTS = ['*']

# Application definition

INSTALLED_APPS = [
    'viewer.apps.ViewerConfig',
    'mturk_manager.apps.MturkManagerConfig',
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.humanize',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'rest_framework',
]


import importlib, inspect, sys
path_plugins = os.path.join(BASE_DIR, '..', 'plugins')
try:
    for name_plugin in os.listdir(path_plugins):
        path_app = os.path.join(BASE_DIR, name_plugin)
        try:
            os.symlink(os.path.join(path_plugins, name_plugin), path_app)
        except FileExistsError:
            pass

        print('installing plugin \'{}\''.format(name_plugin))
        name_appsconfig = None
        module_index_handle = importlib.import_module(name_plugin+'.apps')
        for name, obj in inspect.getmembers(module_index_handle):
            if inspect.isclass(obj):
                if obj.__module__.startswith(name_plugin):
                    name_appsconfig = obj.__name__
                    break

        INSTALLED_APPS = ['{}.apps.{}'.format(name_plugin, name_appsconfig)] + INSTALLED_APPS

except FileNotFoundError: 
    pass

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
    'mturk_manager.middleware.SqlPrintMiddleware',
]

ROOT_URLCONF = 'mturk.urls'

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

WSGI_APPLICATION = 'mturk.wsgi.application'

# Database
# https://docs.djangoproject.com/en/2.0/ref/settings/#databases

VERSION_PROJECT = 14
MESSAGE_BLOCK_DEFAULT = 'Some default block message'

config = configparser.ConfigParser()
config.read('../../mturk_settings.ini')
try:
    PATH_DATABASE = config['MTurk']['database'].strip()
except KeyError:
    PATH_DATABASE = 'db.sqlite3'
    pass
try:
    PATH_FILES_SETTINGS = config['MTurk']['settings-path'].strip()
except KeyError:
    pass

print('storing database into {}'.format(PATH_DATABASE))

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': os.path.join(BASE_DIR, PATH_DATABASE),
    }
}

CACHES = {
    'default': {
        'BACKEND': 'django.core.cache.backends.filebased.FileBasedCache',
        'LOCATION': '../cache',
        'TIMEOUT': None,
    }
}

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

TIME_ZONE = 'Europe/Berlin'

USE_I18N = True

USE_L10N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/2.0/howto/static-files/

STATIC_URL = '/static/'
# STATIC_ROOT = 'static/'

URL_BLOCK_WORKERS = 'https://webis16.medien.uni-weimar.de'
PREEFIX_QUALIFICATION_BLOCK_SOFT = 'fbqeqihngl-'
NAME_QUALIFICATION_BLOCK_SOFT = 'fbqeqihngl'
DESCRIPTION_QUALIFICATION_BLOCK_SOFT = 'If you request this qualification, it is automatically granted!'