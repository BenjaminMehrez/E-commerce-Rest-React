from django.contrib import admin
from django.views.generic import TemplateView
from django.conf import settings
from django.conf.urls.static import static
from django.urls import path, include, re_path

urlpatterns = [
    path('auth/', include('djoser.urls')),
    path('auth/', include('djoser.urls.jwt')),
    path('auth/', include('djoser.social.urls')),
    
    path('api/category/', include('a_pcategory.urls')),
    path('api/product/', include('a_product.urls')),
    path('api/cart/', include('a_ecart.urls')),
    path('api/shipping/', include('a_shipping.urls')),
    path('api/order/', include('a_order.urls')),
    
    path('admin/', admin.site.urls),
]



urlpatterns += static(settings.STATIC_URL, document_root=settings.STATICFILES_DIRS[0])

if settings.DEBUG:
    from django.conf.urls.static import static
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)


urlpatterns += [re_path(r'^.*$', TemplateView.as_view(template_name='index.html'))]