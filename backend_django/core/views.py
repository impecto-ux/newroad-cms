from rest_framework.views import APIView
from rest_framework.response import Response
from .models import HeaderConfiguration, HeroConfiguration, Work
from .serializers import HeaderSerializer, HeroSerializer, WorkSerializer

class GlobalContentView(APIView):
    """
    Returns all content in a single JSON object to match the
    structure expected by the React frontend.
    """
    def get(self, request):
        header = HeaderConfiguration.load()
        hero = HeroConfiguration.load()
        works = Work.objects.all()

        return Response({
            'header': HeaderSerializer(header).data,
            'hero': HeroSerializer(hero).data,
            'works': WorkSerializer(works, many=True).data
        })

    def post(self, request):
        """
        Allows updating all content at once (legacy support for the frontend save button),
        OR we can update purely via Django Admin.
        For now, we'll suggest using Django Admin, but if we need to support the 
        React Admin Panel, we would implement update logic here.
        """
        return Response({"message": "Use Django Admin to update content"}, status=400)
