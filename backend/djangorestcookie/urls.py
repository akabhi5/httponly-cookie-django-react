
from django.contrib import admin
from django.urls import path
from cookieeapp.views import LoginView, LogoutView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', LoginView.as_view()),
    path('logout/', LogoutView.as_view()),
]
