from django.shortcuts import render

def home_view(request):
    return render(request,'my_app/html/home.html')
