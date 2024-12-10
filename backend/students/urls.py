from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import StudentViewSet, AcademicRecordViewSet, MedicalInformationViewSet

router = DefaultRouter()
router.register(r'students', StudentViewSet)
router.register(r'academic-records', AcademicRecordViewSet)
router.register(r'medical-information', MedicalInformationViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
