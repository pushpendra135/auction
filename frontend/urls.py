from django.urls import path
from .views import index
from .views import user, playerauction, serverauction
from .views import login, add, teamlogin

urlpatterns = [
    path('',index),
    path('user',user),
    path('login',login),
    path('add/<str:addCode>',add),
    path('teamlogin',teamlogin),
    path('playerauction/<str:addCode>',playerauction),
    path('serverauction/<str:addCode>',serverauction)
]