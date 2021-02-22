from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
import jwt
from django.conf import settings
from rest_framework import status


class LoginView(APIView):
    def get(self, request, format=None):
        try:
            token = request.COOKIES['token']
        except:
            token = None
        return Response({
            'token': token
        })

    def post(self, request, format=None):
        email = request.data['email']
        password = request.data['password']

        if email == 'abhi' and password == '12345':
            encoded = jwt.encode(
                {'email': email}, settings.SECRET_KEY, algorithm='HS256')

            response = Response()
            response.set_cookie(key='token', value=encoded, httponly=True, samesite='strict', path='/')
            response.data = {
                'user': email,
            }
            return response
        else:
            return Response({'error': 'wrong credentials'}, status=status.HTTP_401_UNAUTHORIZED)


class LogoutView(APIView):
    def get(self, request, format=None):
        response = Response()
        response.delete_cookie('token')
        response.data = {
            "message": "logged out"
        }
        return response
