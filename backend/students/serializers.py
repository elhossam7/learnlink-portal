from rest_framework import serializers
from .models import Student, AcademicRecord, MedicalInformation

class AcademicRecordSerializer(serializers.ModelSerializer):
    class Meta:
        model = AcademicRecord
        fields = '__all__'

class MedicalInformationSerializer(serializers.ModelSerializer):
    class Meta:
        model = MedicalInformation
        fields = '__all__'

class StudentSerializer(serializers.ModelSerializer):
    academic_records = AcademicRecordSerializer(many=True, read_only=True)
    medical_info = MedicalInformationSerializer(read_only=True)

    class Meta:
        model = Student
        fields = '__all__'
