from django.urls import path
from .views import GlobalContentView

urlpatterns = [
    path('content/', GlobalContentView.as_view(), name='global-content'),
]
