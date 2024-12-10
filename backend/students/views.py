from rest_framework import viewsets
from .models import Student, AcademicRecord, MedicalInformation
from .serializers import StudentSerializer, AcademicRecordSerializer, MedicalInformationSerializer

class StudentViewSet(viewsets.ModelViewSet):
    queryset = Student.objects.all()
    serializer_class = StudentSerializer

class AcademicRecordViewSet(viewsets.ModelViewSet):
    queryset = AcademicRecord.objects.all()
    serializer_class = AcademicRecordSerializer

class MedicalInformationViewSet(viewsets.ModelViewSet):
    queryset = MedicalInformation.objects.all()
    serializer_class = MedicalInformationSerializer
