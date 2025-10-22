from django.urls import path
from .views import *

app_name = 'api'

urlpatterns = [
    path('v1/product', ProductView.as_view()), 
    path('v1/product/<int:pk>/', ProductDetailView.as_view()),
    path('v1/category', CategoryView.as_view()), 
    path('v1/category/<int:pk>/', CategoryDetailView.as_view()),
]