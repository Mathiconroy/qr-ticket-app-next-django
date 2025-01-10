from django.urls import path
from qr_tickets.views import LoginUser, WhoAmI, EventList, CustomAuthToken, TicketTypeList, TicketOrderViewSet, RedeemTicketView, DownloadTicketOrder
from rest_framework.routers import SimpleRouter

router = SimpleRouter()
router.register(r'events/(?P<event_id>[0-9]+)/ticketOrders', TicketOrderViewSet, 'ticket_order')

urlpatterns = [
    path("api-token-auth/", CustomAuthToken.as_view()),
    path("login/", LoginUser.as_view()),
    path("whoami/", WhoAmI.as_view()),
    path("events/", EventList.as_view(), name="event-list"),
    path("events/<int:pk>/", EventList.as_view(), name="event-detail"),
    path("events/<int:event_id>/ticketTypes/", TicketTypeList.as_view(), name="ticket-type-list"),
    path("tickets/redeem/<str:qr_key>/", RedeemTicketView.as_view(), name="redeem-ticket"),
    path("tickets/<int:order_id>/download/", DownloadTicketOrder.as_view(), name="download-ticket"),
]

urlpatterns += router.urls
