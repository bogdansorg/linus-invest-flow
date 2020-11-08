"""Unit tests for resources."""
import unittest
from unittest.mock import patch
from fastapi.testclient import TestClient

from backend.app import app
from backend.store.services import InvestmentService

client = TestClient(app)


class InvestResourceTestCase(unittest.TestCase):
    def setUp(self) -> None:
        self.new_investment = {'email': 'bogdan@mail.com', 'amount': 200000, 'project_id': 33}

    @patch('backend.app.InvestmentService', spec=InvestmentService)
    def test_create_investment(self, investmentServiceMock):
        new_id = 100
        inv_serv = investmentServiceMock.return_value
        inv_serv.save.return_value = new_id
        response = client.post("/investments/", json=self.new_investment)
        assert response.status_code == 200
        assert response.json() == {"id": new_id}

    @patch('backend.app.InvestmentService', spec=InvestmentService)
    def test_create_exception_handled(self, investmentServiceMock):
        inv_serv = investmentServiceMock.return_value
        inv_serv.save.side_effect = Exception('error')
        response = client.post("/investments/", json=self.new_investment)
        assert response.status_code == 503
        assert response.json() == {"detail": 'Invest service is down. Please try again later.'}
