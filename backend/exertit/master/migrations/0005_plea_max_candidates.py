# Generated by Django 4.0.4 on 2022-05-10 19:43

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('master', '0004_alter_candidate_cpf'),
    ]

    operations = [
        migrations.AddField(
            model_name='plea',
            name='max_candidates',
            field=models.BigIntegerField(default=2),
        ),
    ]
