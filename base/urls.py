from django.urls import path
from . import views
from .views import MyTokenObtainPairView

from rest_framework_simplejwt.views import(
    TokenRefreshView,
)

urlpatterns=[
    path('',views.home_render),
    path('rooms/',views.show_room),
    path('getrooms',views.getPosts),
    path('gettopics',views.getTopics),
    path('rooms/<pk>',views.viewPost),
    path('getmessages',views.getMessages),
    path('newmessage',views.createMessage),
    path('users',views.getUsers),
    path('newroom',views.createPost),
    path('editpost/<pk>',views.editPost),
    path('token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('deletepost/<pk>',views.deletePost),
    path('registeruser',views.registerUser),
    path('user/<pk>',views.getSpecificUser)
]