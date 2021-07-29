from django.shortcuts import render

# Create your views here.
def index(request, *args, **kwargs):
    return render(request, 'frontend/index.html')

def user(request, *args, **kwargs):
    return render(request, 'frontend/user.html')

def login(request, *args, **kwargs):
    return render(request, 'frontend/login.html')

def add(request, *args, **kwargs):
    return render(request, 'frontend/add.html')

def teamlogin(request, *args, **kwargs):
    return render(request, 'frontend/teamlogin.html')

def playerauction(request, *args, **kwargs):
    return render(request, 'frontend/playerauction.html')

def serverauction(request, *args, **kwargs):
    return render(request, 'frontend/serverauction.html')

