from django.db import models
import uuid
from django.utils import timezone
# Create your models here.

class AuthDataModels(models.Model):
    """ログインモデル"""
    class Meta:
        db_table = 'Users'
        ordering = ['created_at']
        verbose_name = verbose_name_plural = 'user'
    
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    username = models.EmailField(verbose_name="email", max_length=254)
    email = models.EmailField(verbose_name="email", max_length=254)
    password = models.CharField(verbose_name="password", max_length=32)
    created_at = models.DateField(default=timezone.now)