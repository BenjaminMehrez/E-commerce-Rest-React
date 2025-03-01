from django.urls import path
from .views import *

app_name ='orders'

urlpatterns = [
    path('get-orders', ListOrdersView.as_view()),
    path('get-order/<transactionId>', ListOrderDetailView.as_view())
]