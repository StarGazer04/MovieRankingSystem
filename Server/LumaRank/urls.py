from django.urls import path

from . import views #from current directory import views - imports views.py

# defines a URL patter using path function
# the first arg means this pattern matches root of URL
# second arg views.index specifies dthat when this url is accessd, django shoudl call index function from views
# third arg specifies pattern name, so it can be referenced later

#Explanation: Application sends django a GET request. Django knows its inside the LumaRank project, so it loos
#             in the LumaRank urls. it then comapres teh name field with the GET requested field. if they match then
#             Django addds the url string (first param) to the global URL.
urlpatterns = [
    path("", views.main, name="main") ,
    #path("login/", views.LoginPage, name="LoginPage"), 
    path("logout/", views.logout_view, name="logout"), 
    #path("register/", views.RegisterPage, name="RegisterPage"),
    path("search/", views.SearchPage, name="SearchPage"),

]