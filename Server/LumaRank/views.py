from django.shortcuts import render

# Create your views here.
from django.http import HttpResponse
from django.shortcuts import render, redirect
from django.template import loader

def main(request):
    return render(request, 'main.html')

#login page
def LoginPage(request):
    return render(request, 'Login.html')

#logout process: need to ensure users are logged out before returning them to login page
def logout_view(request): 
    return redirect("LoginPage")

#register page
def RegisterPage(request):
    return render(request, "Register.html")

#search page
def SearchPage(request):
    return render(request, 'Search.html')

