.PHONY: test mypy lint clean dev install dist run run-react help


help:
	@echo
	@echo "  test          run tests"
	@echo "  mypy          typecheck using mypy"
	@echo "  lint          lint project using flake8"
	@echo "  autoformat    autoformat files using black"
	@echo "  clean         remove build and python file artifacts"
	@echo "  dev           install in development mode"
	@echo "  install       install without dev dependencies"
	@echo "  dist          build dist packages"
	@echo "  run           run server for development"
	@echo "  run-react     run React app in the development mode"
	@echo "  help          print this message"
	@echo


ensure-poetry:
	@if ! [ -x $(command -v poetry) ]; then \
		echo "Please install poetry (e.g. pip install poetry)"; \
		exit 1; \
	fi

mypy: ensure-poetry
	poetry run mypy --strict <add_project_folder_here>

lint: ensure-poetry mypy
	poetry check
	poetry run flake8 <add_project_folder_here> tests/

autoformat: ensure-poetry lint
	poetry run black <add_project_folder_here> tests

test: ensure-poetry lint
	poetry run pytest --cov <add_project_folder_here>/ --strict tests

clean:
	find . -name '*.pyc' -delete
	find . -name __pycache__ -delete
	rm -rf .coverage dist build *.egg-info

dist: ensure-poetry clean
	poetry build
	ls -l dist

dev: ensure-poetry clean
	poetry install

install: ensure-poetry clean
	poetry install --no-dev

run: ensure-poetry clean
	poetry run <add_run_command_for_project>
