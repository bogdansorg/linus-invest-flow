# Linus invest full-stack code challenge

### Notes
* assumes SQLite is installed an running on the host OS.
* uses Python for the backend code
* uses React+Typescript for the frontend part

## Install

- clone repository
- move to project dir: `cd ./<project_folder>`
- depending on OS make sure you're using the Python 3.7
- install or upgrade `pip` to latest version

`python3 -m pip install --user --upgrade pip`

- install virtual environment

`python3 -m pip install --user virtualenv`

- create virtual environment for project

`python3 -m venv .env`

- activate the virtual environment

`source .env/bin/activate`

- install [Poetry packet manager](https://python-poetry.org/)

`pip install poetry` 

## Install
* for development:
```
make dev
```

## Lint
Activate virtual environment `source .env/bin/activate`.

Uses `mypy` to check type hints and `flake8` to check code style and existence of docstrings. 

```
make lint
```
## Test

Activate virtual environment `source .env/bin/activate`.

Run with: 

```
make test
```
## Run
Activate virtual environment `source .env/bin/activate`.

Run in development mode:

```
make run
```
#### React dev server

**Setup**
1. go to `frontend/` folder
2. run `make install`
3. start the app in the development mode `make run-react`

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

