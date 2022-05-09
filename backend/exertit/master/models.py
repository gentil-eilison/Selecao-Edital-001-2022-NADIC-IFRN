from django.db import models

# Create your models here.
class Voter(models.Model):
    # Represents a voter and a user
    cpf = models.CharField(max_length=14, unique=True)
    password = models.CharField(max_length=30)
    token = models.CharField(max_length=255) # Auto-generated


class Plea(models.Model):
    # Represents a running or closed plea
    title = models.TextField()
    startDate = models.DateField(auto_now=False)
    endDate = models.DateField(auto_now=False)
    kind = models.TextField()
    state = models.BooleanField(default=False)
    voted_by = models.ManyToManyField(Voter)


class Candidate(models.Model):
    # Represents a candidate for plea
    name = models.TextField()
    cpf = models.CharField(max_length=14, unique=True)
    birthdate = models.DateField(auto_now=False)
    address = models.TextField() # City - State
    current_plea = models.ForeignKey(Plea, on_delete=models.CASCADE)
    votes_on_plea = models.BigIntegerField()