#!/usr/bin/env bash

cd ..
/home/kritten/PycharmProjects/mturk-manager/venv/bin/celery -A mturk_db beat -l info