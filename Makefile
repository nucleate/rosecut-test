.PHONY: build-RuntimeDependenciesLayer build-lambda-common
.PHONY: build-getUserFunction build-getAllUsersFunctionS build-createUserFunction build-createUserFunction build-createUserFunction

build-getUserFunction:
	$(MAKE) HANDLER=src/handlers/get-user.ts build-lambda-common
build-getAllUsersFunction:
	$(MAKE) HANDLER=src/handlers/get-all-users.ts build-lambda-common
build-createUserFunction:
	$(MAKE) HANDLER=src/handlers/create-user.ts build-lambda-common
build-updateUserFunction:
	$(MAKE) HANDLER=src/handlers/update-user.ts build-lambda-common
build-deleteUserFunction:
	$(MAKE) HANDLER=src/handlers/delete-user.ts build-lambda-common

build-lambda-common:
	npm install
	rm -rf dist
	echo "{\"extends\": \"./tsconfig.json\", \"include\": [\"${HANDLER}\"] }" > tsconfig-only-handler.json
	npm run build -- --build tsconfig-only-handler.json
	cp -r dist "$(ARTIFACTS_DIR)/"

build-RuntimeDependenciesLayer:
	mkdir -p "$(ARTIFACTS_DIR)/nodejs"
	cp package.json package-lock.json "$(ARTIFACTS_DIR)/nodejs/"
	npm install --production --prefix "$(ARTIFACTS_DIR)/nodejs/"
	rm "$(ARTIFACTS_DIR)/nodejs/package.json"