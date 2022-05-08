from rest_framework import serializers
from master.models import Plea, Candidate, Voter 

class VoterSerializer(serializers.ModelSerializer):
    class Meta:
        model = Voter 
        fields = [
            "id",
            "cpf",
            "token"
        ]


class PleaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Plea
        fields = [
            "id",
            "title",
            "startDate",
            "endDate",
            "kind",
            "state",
            "voted_by"
        ]


class CandidateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Candidate
        fields = [
            "id",
            "name",
            "cpf", 
            "birthdate", 
            "address",
            "current_plea",
            "votes_on_plea"
        ]