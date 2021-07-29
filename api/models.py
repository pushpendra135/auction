from django.db import models
import string
import random

def generate_id():
    length = 6
    while True:
        id = ''.join(random.choices(string.ascii_uppercase, k=length))
        if TAdmin.objects.filter(team_id=id).count() == 0:
            break
    
    return id

# Create your models here.
class TAdmin(models.Model):
    team_id = models.CharField(max_length=8, default=generate_id, unique=True)
    name = models.CharField(max_length=100, null=False)
    mail = models.CharField(max_length=100, unique=True)
    no_teams = models.IntegerField(null=False, default=2)
    no_players = models.IntegerField(null=False, default=2)
    password = models.CharField(max_length=50, null=False)

class Team(models.Model):
    org_id = models.CharField(max_length=8, null=False)
    team_id = models.CharField(max_length=8, default=generate_id, unique=True)
    name = models.CharField(max_length=100, null=False)
    location = models.CharField(max_length=100, null=False)

class Player(models.Model):
    org_id = models.CharField(max_length=8, null=False)
    player_id = models.CharField(max_length=8, default=generate_id, unique=True)
    name = models.CharField(max_length=100, null=False)
    skill = models.CharField(max_length=100, null=False)

class Ongoing(models.Model):
    org_id = models.CharField(max_length=8, null=False)
    player_id = models.CharField(max_length=8, null=False)
    name = models.CharField(max_length=100, null=False)
    skill = models.CharField(max_length=100, null=False)
    team_id = models.CharField(max_length=8)
    team_name = models.CharField(max_length=100)
    price = models.CharField(max_length=10)

class Completed(models.Model):
    org_id = models.CharField(max_length=8, null=False)
    player_id = models.CharField(max_length=8, null=False)
    name = models.CharField(max_length=100, null=False)
    skill = models.CharField(max_length=100, null=False)
    team_id = models.CharField(max_length=8)
    team_name = models.CharField(max_length=100)
    price = models.CharField(max_length=10)