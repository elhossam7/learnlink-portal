from django.contrib import admin
from .models import Student, AcademicRecord, MedicalInformation

admin.site.register(Student)
admin.site.register(AcademicRecord)
admin.site.register(MedicalInformation)
