from django.contrib import admin
from django.urls import path
from django.conf.urls import include
from rest_framework import routers
from .views import TAdminView, TeamView,  PlayerView, OngoingView, CompletedView
from .views import CreateUserView, CreateTeamView, CreatePlayerView
from .views import GetAdd, GetTeam, DeleteOngoingView
from .views import CreateOngoingView, CreateCompletedView

router = routers.DefaultRouter()
router.register('tadmin', TAdminView)
router.register('team', TeamView)
router.register('player', PlayerView)
router.register('ongoing', OngoingView)
router.register('completed', CompletedView)

urlpatterns = [
    path('', include(router.urls)),
    path('createuser', CreateUserView.as_view()),
    path('createteam', CreateTeamView.as_view()),
    path('createplayer', CreatePlayerView.as_view()),
    path('get-add', GetAdd.as_view()),
    path('get-team', GetTeam.as_view()),
    path('createongoing', CreateOngoingView.as_view()),
    path('deleteongoing', DeleteOngoingView.as_view()),
    path('createcompleted', CreateCompletedView.as_view())
]