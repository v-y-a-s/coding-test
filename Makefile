#!make

.PHONY: prod dev

prod:
	@echo " =========================================================== "
	@echo " Prod Docker "
	@echo " =========================================================== "
	@docker build . -t telco && docker run -p 8000:8000 telco 
