from django.urls import path
from qr_tickets.views import LoginUser, WhoAmI, EventList, CustomAuthToken, TicketTypeList
from rest_framework.authtoken import views

urlpatterns = [
    path("api-token-auth/", CustomAuthToken.as_view()),
    path("login/", LoginUser.as_view()),
    path("whoami/", WhoAmI.as_view()),
    path("events/", EventList.as_view()),
    path("events/<int:event_id>/ticketTypes/", TicketTypeList.as_view()),
]
