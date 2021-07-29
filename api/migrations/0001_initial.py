# Generated by Django 3.1.7 on 2021-03-31 10:12

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='TAdmin',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('team_id', models.CharField(max_length=8, unique=True)),
                ('name', models.CharField(max_length=100)),
                ('mail', models.CharField(max_length=100, unique=True)),
                ('no_teams', models.IntegerField(default=2)),
                ('no_players', models.IntegerField(default=2)),
                ('password', models.CharField(max_length=50)),
            ],
        ),
    ]
