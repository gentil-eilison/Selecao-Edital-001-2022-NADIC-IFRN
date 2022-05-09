from rest_framework.response import Response 
from rest_framework.decorators import api_view
from rest_framework import status 
from master.models import Plea, Candidate, Voter
from api.serializers import PleaSerializer, CandidateSerializer, VoterSerializer

from uuid import uuid4

from datetime import datetime

@api_view(['POST', 'GET'])
def create_plea(request):
    try:
        if request.method == "POST":
            plea_exist = Plea.objects.get(title=request.data["title"])
            if plea_exist:
                return Response({
                    "message": "There is already a plea with this title. Pick another.",
                }, status=status.HTTP_400_BAD_REQUEST)

        elif request.method == "GET":
            pleas = Plea.objects.all()
            serialized_pleas = PleaSerializer(pleas, many=True)

            return Response(serialized_pleas.data)

    except Plea.DoesNotExist: 
        Plea.objects.create(
            title=request.data["title"],
            startDate=datetime.strptime(request.data["startDate"], "%d/%m/%Y"),
            endDate=datetime.strptime(request.data["endDate"], "%d/%m/%Y"),
            kind=request.data["kind"],
            state=False
        )

        return Response({
            "message": "The plea was created successfully."
        }, status=status.HTTP_201_CREATED)


@api_view(['DELETE', 'GET'])
def plea(request, id):
    try:
        plea = Plea.objects.get(id=id)

        if request.method == "DELETE":
            plea.delete()
            return Response({
                "message": "The plea was deleted"
            }, status=status.HTTP_204_NO_CONTENT)

        elif request.method == "GET":
            serialized_plea = PleaSerializer(plea)
            return Response(serialized_plea.data)

    except Plea.DoesNotExist:
        return Response({
            "message": "This plea does not exist"
        }, status=status.HTTP_404_NOT_FOUND)


@api_view(['POST'])
def voter(request):
    try:
        voter = Voter.objects.get(cpf=request.data["cpf"])

        if voter:
            return Response({
                "message": "This voter already exists. Try using another CPF."
            }, status=status.HTTP_409_CONFLICT)
    except Voter.DoesNotExist:
        if request.data["password"] != request.data["confirm_password"]:
            return Response({
                "message": "Your passwords don't match. Try again"
            }, status=status.HTTP_406_NOT_ACCEPTABLE)
        
        else:
            Voter.objects.create(
                cpf=request.data["cpf"],
                password=request.data["password"],
                token=uuid4()
            )

            return Response({
                "message": "Voter created successfully",
            }, status=status.HTTP_201_CREATED) 


@api_view(["POST"])
def signIn(request):
    try:
        voter = Voter.objects.get(cpf=request.data["cpf"], password=request.data["password"])

        voter.token = uuid4()

        voter.save()

        serialized_voter = VoterSerializer(voter)

        return Response(serialized_voter.data)
    except Voter.DoesNotExist:
        return Response({
            "message": "This account doesn't exist"
        }, status=status.HTTP_404_NOT_FOUND)


@api_view(['POST', 'GET'])
def candidate(request):
    if request.method == "POST":
        try:
            candidate = Candidate.objects.get(cpf=request.data["cpf"])

            if candidate:
                return Response({
                    "message": "There is already a candidate with that cpf. Try another."
                }, status=status.HTTP_403_FORBIDDEN)

        except Candidate.DoesNotExist:
            try:
                Candidate.objects.create(
                    name=request.data["name"],
                    cpf=request.data["cpf"],
                    birthdate=datetime.strptime(request.data["birthdate"], "%d/%m/%Y"),
                    address=request.data["address"],
                    current_plea=Plea.objects.get(title=request.data["current_plea"]),
                    votes_on_plea=0
                ) 
                
                return Response({
                    "message": "Candidate succesfully created!"
                }, status=status.HTTP_200_OK)
            except Plea.DoesNotExist:
                return Response({
                    "message": "This plea doesn't exist. Pick another"
                }, status=status.HTTP_400_BAD_REQUEST)
    
    elif request.method == "GET":
        candidates = Candidate.objects.all()

        serialized_candidates = CandidateSerializer(candidates, many=True)

        return Response(serialized_candidates.data)


@api_view(['DELETE'])
def delete_candidate(request, id):
    try:
        candidate = Candidate.objects.get(id=id)

        if candidate:
            candidate.delete()

            return Response({
                "message": "The candidate was successfully deleted"
            }, status=status.HTTP_200_OK)
    except Candidate.DoesNotExist:
        return Response({
            "message": "That candidate doesn't exist. Try again"
        }, status=status.HTTP_404_NOT_FOUND)
        