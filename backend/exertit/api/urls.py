from django.urls import path, include
from api import views

urlpatterns = [
    path("plea/", views.create_plea),
    path("plea/<id>/", views.plea)
]