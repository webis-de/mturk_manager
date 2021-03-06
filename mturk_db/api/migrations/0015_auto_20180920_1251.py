# Generated by Django 2.0 on 2018-09-20 12:51

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0014_project_settings_batch_default'),
    ]

    operations = [
        migrations.AlterField(
            model_name='template_worker',
            name='template_assignment',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='templates_used', to='api.Template_Assignment'),
        ),
        migrations.AlterField(
            model_name='template_worker',
            name='template_hit',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='templates_used', to='api.Template_Hit'),
        ),
    ]
