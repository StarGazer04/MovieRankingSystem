from django.shortcuts import render

# Create your views here.
from django.http import HttpResponse
from django.shortcuts import render, redirect
from django.template import loader

from django.contrib import messages #message framework used to store temp messaes for users

#login and registration imports
from .forms import RegisterForm
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User

def main(request):
    if not request.user.is_authenticated: #request.user contains currently logged in user (Django knows this from session cookies)
        return redirect('login')
    return render(request, 'main.html')

#login page
def LoginPage(request):

    #check if user is authenticated (logged in) before redirecting them to login browser
    if request.user.is_authenticated: #request.user contains currently logged in user (Django knows this from session cookies)
        return redirect('main')

    #if the request is a POST (user is trying to login in)
    if request.method == 'POST':
        username = request.POST.get('Username')
        password = request.POST.get('Password')

        #check if username is in database (e.g. does not exist)
        if not User.objects.filter(username=username).exists():
            messages.error(request, 'Invalid Username') 
            return redirect('login')
        
        user = authenticate(request, username=username, password=password)

        if user is None:
            messages.error(request, "Invalid Password")
            return redirect('login') #redirect to login page, message will persist across redirects
        else:
            login(request, user)
            return redirect('main')



    return render(request, 'Login.html')

#logout process: need to ensure users are logged out before returning them to login page
def logout_view(request): 
    logout(request)
    return redirect("login")

#register page
def RegisterPage(request):

    #check if user is authenticated (logged in) before redirecting them to login browser
    if request.user.is_authenticated: #request.user contains currently logged in user (Django knows this from session cookies)
        return redirect('main')

    #create a form
    form = RegisterForm()

    #if request method is POST (user clicked register button to POST form in register page) then fill in the form above
    if request.method == 'POST':
        form = RegisterForm(request.POST) #fills in the form with information user typed
        if form.is_valid(): #checks if form is valid 
            form.save() #saves the form 

            #create success message for user
            user = form.cleaned_data.get('username')
            messages.success(request, 'Account was created for ' + user)

            #redirect user to login page upon register success.
            return redirect('login')
        
        #if form is not valid, indicate error to user:
        else:
            #check if email is already registered
            if(User.objects.filter(email=form.cleaned_data.get('email')).exists()):
                messages.error(request, "Email already exists")
            #check if passwords dont match
            elif(User.objects.filter(password1 = form.cleaned_data.get('password1')) != User.objects.filter(password2 = form.cleaned_data.get('password2'))):
                messages.error(request, "Passwords don't match")


    context = {'form':form}
    return render(request, "Register.html", context)


#search page
def SearchPage(request):
    return render(request, 'Search.html')

