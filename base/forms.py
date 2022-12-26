from django.forms import ModelForm
from .models import User,Room
from django import forms
from django.contrib.auth.models import User

from django.contrib.auth.forms import UserCreationForm

class RoomForm(ModelForm):
    class Meta:
        model= Room
        fields='__all__'

class CreateUserForm(UserCreationForm):
    class Meta:
        model=User
        fields=['username','email','password1','password2']