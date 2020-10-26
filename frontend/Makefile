.PHONY: test clean install dist run help

NVM_DIR = $(shell echo $$NVM_DIR)

help:
	@echo
	@echo "  test       run tests"
	@echo "  clean      remove node_modules dir"
	@echo "  install    install dependencies"
	@echo "  dist       build the app"
	@echo "  run        run the app in development mode"
	@echo "  help       print this message"
	@echo

test:
	. ${NVM_DIR}/nvm.sh && nvm use && npm test

clean:
	rm -rf build
	rm -rf node_modules

install: clean
	. ${NVM_DIR}/nvm.sh && nvm install
	. ${NVM_DIR}/nvm.sh && nvm use && npm install

dist:
	. ${NVM_DIR}/nvm.sh && nvm use && npm run build
	ls -l build

run:
	. ${NVM_DIR}/nvm.sh && nvm use && npm start
