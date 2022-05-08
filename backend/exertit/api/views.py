from rest_framework.response import Response 
from rest_framework.decorators import api_view
from rest_framework import status 
from master.models import Plea, Candidate, Voter
from api.serializers import PleaSerializer, CandidateSerializer, VoterSerializer

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