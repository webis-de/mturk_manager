# Generated by Django 2.2.1 on 2019-07-10 17:13

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0054_celerytasks_description'),
    ]

    operations = [
        migrations.AlterField(
            model_name='celerytasks',
            name='datetime_finished',
            field=models.DateTimeField(null=True),
        ),
        migrations.AlterField(
            model_name='celerytasks',
            name='datetime_started',
            field=models.DateTimeField(null=True),
        ),
        migrations.AlterField(
            model_name='celerytasks',
            name='status',
            field=models.IntegerField(choices=[(0, 'CREATED')]),
        ),
    ]
