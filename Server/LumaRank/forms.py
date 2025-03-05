from django import forms
from django.contrib.auth.models import User
from django.contrib.auth.forms import UserCreationForm

class RegisterForm(UserCreationForm):
    email = forms.EmailField() #designed to handle email addresses. defualts the input value to a string and validates the email

    class Meta:
        model = User
        fields = ["username", "email", "password1", "password2"]