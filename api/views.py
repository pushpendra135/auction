from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from .serializers import TAdminSerializer, CreateUserSerializer, TeamSerializer, CreateTeamSerializer
from .serializers import PlayerSerializer, CreatePlayerSerializer, OngoingSerializer, CompletedSerializer
from .serializers import CreateOngoingSerializer, CreateCompletedSerializer, DeleteOngingSerializer
from .models import TAdmin, Team, Player, Ongoing, Completed
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import generics, status
from django.http import HttpResponse
import csv
import time

import logging,traceback
logger = logging.getLogger('django')

localtime = time.asctime( time.localtime(time.time()) )

# Create your views here.
class TAdminView(viewsets.ModelViewSet):
    queryset = TAdmin.objects.all()
    serializer_class = TAdminSerializer

class TeamView(viewsets.ModelViewSet):
    queryset = Team.objects.all()
    serializer_class = TeamSerializer

class PlayerView(viewsets.ModelViewSet):
    queryset = Player.objects.all()
    serializer_class = PlayerSerializer

class CreateUserView(APIView):
    serializer_class = CreateUserSerializer

    def post(self, request, format=None):

        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            name = serializer.data.get('name')
            no_teams = serializer.data.get('no_teams')
            no_players = serializer.data.get('no_players')
            password = serializer.data.get('password')
            mail = serializer.data.get('mail')
            #print(name,no_players,no_teams,mail,password)
            user = TAdmin(name=name, mail=mail, no_teams=no_teams, no_players=no_players, password=password)
            user.save()
            logger.info('OrganiserResitered')
                
            return Response(TAdminSerializer(user).data, status=status.HTTP_201_CREATED)

        return Response({'Bad Request': 'Invalid data...'}, status=status.HTTP_400_BAD_REQUEST)

class CreateTeamView(APIView):
    serializer_class = CreateTeamSerializer

    def post(self, request, format=None):

        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            org_id = serializer.data.get('org_id') 
            name = serializer.data.get('name')
            location = serializer.data.get('location')
            #print(org_id, name, location)
            team = Team(org_id=org_id, name=name, location=location)
            team.save()
            logger.info('TeamAdded')
            return Response(TeamSerializer(team).data, status=status.HTTP_201_CREATED)

        return Response({'Bad Request': 'Invalid data...'}, status=status.HTTP_400_BAD_REQUEST)

class CreatePlayerView(APIView):
    serializer_class = CreatePlayerSerializer

    def post(self, request, format=None):

        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            org_id = serializer.data.get('org_id') 
            name = serializer.data.get('name')
            skill = serializer.data.get('skill')
            #print(org_id, name, skill)
            player = Player(org_id=org_id, name=name, skill=skill)
            player.save()
            logger.info('PlayerAdded')
            return Response(PlayerSerializer(player).data, status=status.HTTP_201_CREATED)

        return Response({'Bad Request': 'Invalid data...'}, status=status.HTTP_400_BAD_REQUEST)


class GetAdd(APIView):
    serializer_class = TAdminSerializer
    lookup_url_kwarg = 'code'

    def get(self, request, format=None):
        code = request.GET.get(self.lookup_url_kwarg)
        if code != None:
            add = TAdmin.objects.filter(team_id=code)
            if len(add) > 0:
                data = TAdminSerializer(add[0]).data
                return Response(data, status=status.HTTP_200_OK)
            return Response({'Room Not Found': 'Invalid Room Code.'}, status=status.HTTP_404_NOT_FOUND)

        return Response({'Bad Request': 'Code paramater not found in request'}, status=status.HTTP_400_BAD_REQUEST)

class GetTeam(APIView):
    serializer_class = TeamSerializer
    lookup_url_kwarg = 'code'

    def get(self, request, format=None):
        code = request.GET.get(self.lookup_url_kwarg)
        if code != None:
            add = Team.objects.filter(team_id=code)
            if len(add) > 0:
                data = TeamSerializer(add[0]).data
                return Response(data, status=status.HTTP_200_OK)
            return Response({'Room Not Found': 'Invalid Room Code.'}, status=status.HTTP_404_NOT_FOUND)

        return Response({'Bad Request': 'Code paramater not found in request'}, status=status.HTTP_400_BAD_REQUEST)

class OngoingView(viewsets.ModelViewSet):
    queryset = Ongoing.objects.all()
    serializer_class = OngoingSerializer

class CompletedView(viewsets.ModelViewSet):
    queryset = Completed.objects.all()
    serializer_class = CompletedSerializer

class CreateCompletedView(APIView):
    serializer_class = CreateCompletedSerializer

    def post(self, request, format=None):

        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            #('org_id', 'player_id', 'name', 'skill', 'team_id', 'team_name', 'price')
            org_id = serializer.data.get('org_id') 
            player_id = serializer.data.get('player_id') 
            name = serializer.data.get('name')
            skill = serializer.data.get('skill')
            team_id = serializer.data.get('team_id')
            team_name = serializer.data.get('team_name')
            price = serializer.data.get('price')
            player = Completed(org_id=org_id, player_id=player_id, name=name, skill=skill, team_id=team_id, team_name=team_name, price=price)
            player.save()
            logger.info('PlayerBidComplete')
            return Response(CompletedSerializer(player).data, status=status.HTTP_201_CREATED)

        return Response({'Bad Request': 'Invalid data...'}, status=status.HTTP_400_BAD_REQUEST)

class DeleteOngoingView(APIView):
    serializer_class = DeleteOngingSerializer

    def post(self, request, format=None):

        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            #('org_id', 'player_id', 'name', 'skill', 'team_id', 'team_name', 'price')
            org_id = serializer.data.get('org_id') 
            Ongoing.objects.all().delete()

            return Response({'Data Deleted'}, status=status.HTTP_201_CREATED)

        return Response({'Bad Request': 'Invalid data...'}, status=status.HTTP_400_BAD_REQUEST)


class CreateOngoingView(APIView):
    serializer_class = CreateOngoingSerializer

    def post(self, request, format=None):

        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            #('org_id', 'player_id', 'name', 'skill', 'team_id', 'team_name', 'price')
            org_id = serializer.data.get('org_id') 
            player_id = serializer.data.get('player_id') 
            name = serializer.data.get('name')
            skill = serializer.data.get('skill')
            team_id = serializer.data.get('team_id')
            team_name = serializer.data.get('team_name')
            price = serializer.data.get('price')
            player = Ongoing(org_id=org_id, player_id=player_id, name=name, skill=skill, team_id=team_id, team_name=team_name, price=price)
            player.save()
            logger.info('TeamBidedForPlayer')

            return Response(OngoingSerializer(player).data, status=status.HTTP_201_CREATED)

        return Response({'Bad Request': 'Invalid data...'}, status=status.HTTP_400_BAD_REQUEST)
