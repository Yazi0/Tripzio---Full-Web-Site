from django.db import models

class ContactMessage(models.Model):
    STATUS_CHOICES = [
        ('NEW', 'New'),
        ('READ', 'Read'),
        ('REPLIED', 'Replied'),
        ('CLOSED', 'Closed'),
    ]

    name = models.CharField(max_length=255)
    email = models.EmailField()
    subject = models.CharField(max_length=255)
    message = models.TextField()
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default='NEW')
    admin_notes = models.TextField(blank=True, help_text='Internal notes for admin')
    created_at = models.DateTimeField(auto_now_add=True)
    replied_at = models.DateTimeField(null=True, blank=True)

    class Meta:
        ordering = ['-created_at']
        verbose_name = 'Contact Message'

    def __str__(self):
        return f"[{self.status}] {self.name} - {self.subject}"

class ContactInfo(models.Model):
    address = models.TextField(default="123 Tourism Drive, Colombo 03, Sri Lanka")
    email_1 = models.EmailField(default="hello@tripzio.com")
    email_2 = models.EmailField(default="support@tripzio.com")
    phone_1 = models.CharField(max_length=20, default="+94 11 234 5678")
    phone_2 = models.CharField(max_length=20, default="+94 77 123 4567")
    whatsapp = models.CharField(max_length=20, blank=True, default="+94771234567")
    map_url = models.URLField(default="https://images.unsplash.com/photo-1569668723429-9fb7e19bd65e?auto=format&fit=crop&q=80&w=1000")
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "Contact Information"
        verbose_name_plural = "Contact Information"

    def __str__(self):
        return "Company Contact Settings"
