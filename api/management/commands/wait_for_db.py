import time
from django.db import connections
from django.db.utils import OperationalError
from django.core.management.base import BaseCommand


class Command(BaseCommand):
    """Django command to pause execution until database is available"""

    def handle(self, *args, **options):
        self.stdout.write('Waiting for database...')
        connected = False
        while not connected:
            try:
                # Try to obtain a cursor — this will raise an OperationalError until the DB is ready
                connection = connections['default']
                cursor = connection.cursor()
                cursor.close()
                connected = True
            except OperationalError as e:
                self.stdout.write(f'Database unavailable ({e}), waiting 1 second...')
                time.sleep(1)

        self.stdout.write(self.style.SUCCESS('Database available!'))