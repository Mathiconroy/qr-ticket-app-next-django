from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import User, Event, TicketType, TicketOrderDetail, TicketOrderHeader

# Register your models here.
admin.site.register(User, UserAdmin)
admin.site.register(Event)
admin.site.register(TicketType)
admin.site.register(TicketOrderHeader)
admin.site.register(TicketOrderDetail)
