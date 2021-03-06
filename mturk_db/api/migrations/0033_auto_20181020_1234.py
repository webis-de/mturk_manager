# Generated by Django 2.0 on 2018-10-20 12:34

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0032_worker_is_blocked_global'),
    ]

    operations = [
        migrations.RenameField(
            model_name='count_assignments_worker_project',
            old_name='fk_project',
            new_name='project',
        ),
        migrations.RenameField(
            model_name='count_assignments_worker_project',
            old_name='fk_worker',
            new_name='worker',
        ),
        migrations.AddField(
            model_name='project',
            name='count_assignments_max_per_worker',
            field=models.IntegerField(null=True),
        ),
        migrations.AlterUniqueTogether(
            name='count_assignments_worker_project',
            unique_together={('project', 'worker')},
        ),
    ]
