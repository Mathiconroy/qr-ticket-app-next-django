from django.urls import path
from qr_tickets.views import LoginUser, WhoAmI, EventList, CustomAuthToken, TicketTypeList, TicketOrderViewSet, RedeemTicketView
from rest_framework.routers import SimpleRouter
from rest_framework.authtoken import views

# TODO: Figure out how this works.
router = SimpleRouter()
router.register(r'events/(?P<event_id>[0-9]+)/tickets', TicketOrderViewSet, 'ticket_order')

urlpatterns = [
    path("api-token-auth/", CustomAuthToken.as_view()),
    path("login/", LoginUser.as_view()),
    path("whoami/", WhoAmI.as_view()),
    path("events/", EventList.as_view()),
    path("events/<int:event_id>/ticketTypes/", TicketTypeList.as_view()),
    path("tickets/redeem/<str:qr_key>/", RedeemTicketView.as_view(), name="redeem-ticket")
]

urlpatterns += router.urls
