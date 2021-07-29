from rest_framework import serializers
from .models import TAdmin, Team, Player, Ongoing, Completed

class TAdminSerializer(serializers.ModelSerializer):
    class Meta:
        model = TAdmin
        fields = ('id', 'team_id', 'name', 'mail', 'no_teams', 'no_players', 'password')

class CreateUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = TAdmin
        fields = ('name', 'mail', 'no_teams', 'no_players', 'password')

class TeamSerializer(serializers.ModelSerializer):
    class Meta:
        model = Team
        fields = ('id', 'org_id', 'team_id', 'name', 'location')

class CreateTeamSerializer(serializers.ModelSerializer):
    class Meta:
        model = Team
        fields = ('org_id', 'name', 'location')

class PlayerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Player
        fields = ('id', 'player_id', 'org_id', 'name', 'skill')

class CreatePlayerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Player
        fields = ('org_id', 'name', 'skill')

class OngoingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ongoing
        fields = ('org_id', 'player_id', 'name', 'skill', 'team_id', 'team_name', 'price')

class CreateOngoingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ongoing
        fields = ('org_id', 'player_id', 'name', 'skill', 'team_id', 'team_name', 'price')

class DeleteOngingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ongoing
        fields = ('org_id', )

class CompletedSerializer(serializers.ModelSerializer):
    class Meta:
        model = Completed
        fields = ('org_id', 'player_id', 'name', 'skill', 'team_id', 'team_name', 'price')

class CreateCompletedSerializer(serializers.ModelSerializer):
    class Meta:
        model = Completed
        fields = ('org_id', 'player_id', 'name', 'skill', 'team_id', 'team_name', 'price')