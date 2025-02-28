from django.db import models

# Create your models here.


class Shipping(models.Model):
    class Meta:
        verbose_name = 'Shipping'
        verbose_name_plural = 'Shipping'

    name = models.CharField(max_length=255, unique=True)
    time_to_delivery = models.CharField(max_length=255)
    price = models.DecimalField(max_length=5, decimal_places=2, max_digits=10)
    
    
    def __str__(self):
        return self.name