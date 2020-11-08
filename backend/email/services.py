"""Service to send E-mails."""
import time

from backend.store.models import Investment


class EmailService:
    def __init__(self, config):
        # TODO config should contain necessary credentials to send data to E-mail service
        self.config = config

    def send_confirmation(self, investment: Investment):
        print('Sending confirmation E-mail to', investment.email)
        time.sleep(3)
        print('Done!')
        return
