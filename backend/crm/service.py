"""Service to store data in CRM."""
import time

from backend.store.models import Investment


class CRMService:
    def __init__(self, config):
        # TODO config should contain necessary credentials to interact with CRM system
        self.config = config

    def create(self, investment: Investment):
        print('Creating CRM entry for new investment...')
        time.sleep(2)
        print('Done!')
        return
