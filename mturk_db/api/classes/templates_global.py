from api.models import Account_Mturk, Template_Global
from mturk_db.settings import URL_MTURK_SANDBOX
import boto3, re, json
from django.utils.text import slugify
from collections import Counter
from django.conf import settings

class Manager_Templates_Global(object):
    @classmethod
    def get_all_for_project(cls, id_project):
        return Template_Global.objects.filter(project=id_project)

    @classmethod
    def create(cls, data):
        template_global = Template_Global.objects.create(
            project = data['database_object_project'],
            name=data['name'],
            template=data['template'],
        )

        return template_global
        
    @classmethod
    def update(cls, instance, data):
        for key, value in data.items():
            setattr(instance, key, value)

        instance.save()

        return instance

    @staticmethod
    def delete(id_template):
        Template_Global.objects.filter(id=id_template).delete()
