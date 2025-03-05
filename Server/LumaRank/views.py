from django.shortcuts import render

# Create your views here.
from django.http import HttpResponse
from django.shortcuts import render, redirect
from django.template import loader

from django.contrib import messages

from .forms import RegisterForm

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

            #redirect user to login page upon register success
            return redirect('LoginPage')

    context = {'form':form}
    return render(request, "Register.html", context)


#search page
def SearchPage(request):
    return render(request, 'Search.html')

