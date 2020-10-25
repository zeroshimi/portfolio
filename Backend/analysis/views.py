from rest_framework import status, views
from rest_framework.response import Response



# Create your views here.
class Calculate(views.APIView):
    def post(self, request, *args, **kwargs):
        #print(request.body.decode())
        return Response(request.body.decode(), status.HTTP_200_OK)
    def get(self, request, *args, **kwargs):
        return Response('You get it', status.HTTP_200_OK)
