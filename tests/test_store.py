"""Unit test for store services."""
import unittest
from unittest.mock import MagicMock, patch

from sqlalchemy.orm import Session

from backend.store.models import Investment
from backend.store.services import InvestmentService


class InvestmentServiceTestCase(unittest.TestCase):
    """Test for CRUD operations on investments."""

    def setUp(self) -> None:
        self.session = MagicMock(spec=Session)

    def test_save(self):
        session_add_mock = MagicMock()
        session_commit_mock = MagicMock()
        self.session.add = session_add_mock
        self.session.commit = session_commit_mock
        service = InvestmentService(self.session)
        new_investment = Investment(email='bogdan@email.com', investment_amount=200000, project_id=2)
        service.save(new_investment)

        session_add_mock.assert_called_once_with(new_investment)
        session_commit_mock.assert_called_once()
