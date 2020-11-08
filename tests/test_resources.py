"""Unit tests for resources."""
import unittest
from unittest.mock import patch
from fastapi.testclient import TestClient

from backend.app import app
from backend.store.services import InvestmentService

client = TestClient(app)


class InvestResourceTestCase(unittest.TestCase):

    @patch('backend.app.InvestmentService', spec=InvestmentService)
    def test_create_investment(self, investmentServiceMock):
        investment_data = {'email': 'bogdan@mail.com', 'amount': 200000, 'project_id': 33}
        new_id = 100
        inv_serv = investmentServiceMock.return_value
        inv_serv.save.return_value = new_id
        response = client.post("/investments/", json=investment_data)
        assert response.status_code == 200
        assert response.json() == {"id": new_id}
