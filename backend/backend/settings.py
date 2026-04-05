import os
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent.parent

# SECURITY
SECRET_KEY = "django-insecure-secret-key"
DEBUG = True
ALLOWED_HOSTS = ["*"]

# ========================
# INSTALLED APPS
# ========================
INSTALLED_APPS = [
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",

    # third-party
    "rest_framework",
    "corsheaders",
    "channels",

    # local apps (IMPORTANT: no 'apps.' prefix)
    "users",
    "game",
]

# ========================
# MIDDLEWARE
# ========================
MIDDLEWARE = [
    "corsheaders.middleware.CorsMiddleware",  # must be at top
    "django.middleware.security.SecurityMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
]

# ========================
# URL / WSGI / ASGI
# ========================
ROOT_URLCONF = "backend.urls"

WSGI_APPLICATION = "backend.wsgi.application"
ASGI_APPLICATION = "backend.asgi.application"

# ========================
# DATABASE (SQLite)
# ========================
DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.sqlite3",
        "NAME": BASE_DIR / "db.sqlite3",
    }
}

# ========================
# PASSWORD VALIDATION
# ========================
AUTH_PASSWORD_VALIDATORS = []

# ========================
# LANGUAGE / TIME
# ========================
LANGUAGE_CODE = "en-us"
TIME_ZONE = "UTC"
USE_I18N = True
USE_TZ = True

# ========================
# STATIC FILES
# ========================
STATIC_URL = "static/"

# ========================
# DEFAULT AUTO FIELD
# ========================
DEFAULT_AUTO_FIELD = "django.db.models.BigAutoField"

# ========================
# CORS (FIX FRONTEND ERROR)
# ========================
CORS_ALLOW_ALL_ORIGINS = True

# ========================
# DJANGO REST FRAMEWORK
# ========================
REST_FRAMEWORK = {
    "DEFAULT_AUTHENTICATION_CLASSES": (
        "rest_framework_simplejwt.authentication.JWTAuthentication",
    ),
}

# ========================
# CHANNELS (WebSocket)
# ========================
CHANNEL_LAYERS = {
    "default": {
        "BACKEND": "channels.layers.InMemoryChannelLayer",
    },
}
# ========================
# TEMPLATES (REQUIRED for admin)
# ========================
TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": [],  # you can add template folder later
        "APP_DIRS": True,
        "OPTIONS": {
            "context_processors": [
                "django.template.context_processors.debug",
                "django.template.context_processors.request",
                "django.contrib.auth.context_processors.auth",
                "django.contrib.messages.context_processors.messages",
            ],
        },
    },
]