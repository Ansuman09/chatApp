from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import Room,Topic,Message,User
from .serializers import RoomSerializer,TopicSerializer,MessageSerializer,UserSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from django.contrib.auth.forms import UserCreationForm
from .forms import CreateUserForm

#simple jwt
class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token= super().get_token(user)

        token['username']=user.username
        return token

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class=MyTokenObtainPairSerializer

def home_render(request):
    return render(request,'base/home.html')

def show_room(request):

    return render(request,'base/room.html')


@api_view(['GET'])
def getPosts(request):
    room=Room.objects.all()
    serializer=RoomSerializer(room,many=True)
    return Response(serializer.data)
# Create your views here.

@api_view(['GET'])
def getTopics(request):
    topic=Topic.objects.all()
    serializer=TopicSerializer(topic,many=True)
    return Response(serializer.data)

@api_view(['GET'])
def viewPost(request,pk):
    post=Room.objects.get(id=pk)
    serializer=RoomSerializer(post)
    return Response(serializer.data)

@api_view(['GET'])
def getMessages(request):
    messages=Message.objects.all()
    serializer=MessageSerializer(messages,many=True)
    return Response(serializer.data)

@api_view(['POST'])
def createMessage(request):
    message=request.data
    print(message)
    serializer=MessageSerializer(data=message)
    if serializer.is_valid():
        serializer.save()
    return Response(serializer.data)

@api_view(['GET'])
def getUsers(request):
    users=User.objects.all()
    serializer=UserSerializer(users,many=True)
    return Response(serializer.data)

@api_view(['POST'])
def createPost(request):
    post=request.data
    serializer=RoomSerializer(data=post)
    if serializer.is_valid():
        serializer.save()
    return Response(serializer.data)

@api_view(['PUT'])
def editPost(request,pk):
    post=Room.objects.get(id=pk)
    serializer=RoomSerializer(instance=post,data=request.data)

    if serializer.is_valid():
        serializer.save()
    return Response(serializer.data)

@api_view(['DELETE'])
def deletePost(request,pk):
    post=Room.objects.get(id=int(pk))
    post.delete()
    return Response('Sucessfully deleted')


def registerUser(request):
    
    form=CreateUserForm()
    if request.method=='POST':
        form= CreateUserForm(request.POST)
        if form.is_valid():
            form.save()
    
    context={'form':form}



    return render(request,'create.html',context=context)


@api_view(['GET'])
def getSpecificUser(request,pk):
    user = User.objects.get(id=pk)
    serializer=UserSerializer(user)
    return Response(serializer.data)