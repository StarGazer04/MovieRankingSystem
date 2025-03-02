from django.urls import path

from . import views #from current directory import views - imports views.py

# defines a URL patter using path function
# the first arg means this pattern matches root of URL
# second arg views.index specifies dthat when this url is accessd, django shoudl call index function from views
# third arg specifies pattern name, so it can be referenced later
urlpatterns = [
    path("", views.index, name="index") ,
]