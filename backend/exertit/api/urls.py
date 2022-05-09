from django.urls import path, include
from api import views

urlpatterns = [
    path("plea/", views.create_plea),
    path("plea/<id>/", views.plea),
    path("voter/", views.voter),
    path("voter/<id>/", views.get_voter),
    path("signIn/", views.signIn),
    path("candidate/", views.candidate),
    path("candidate/<id>/", views.delete_candidate)
]