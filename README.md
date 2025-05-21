# Podscribe Top25 shows page testing 

In this project, Playwright used as a testing framework. Tests are conducted only in Chrome. Reporters used: Allure, html. 

2 tests: 
#1 - checks whether top 25 titles are searchable and the titles are shown and can be found in search results and search dropdown;
#2 - test verifies whether there any % spikes, and if there is any that 80%+ then it shows error. 

In order to set up and adjust CI/CD proccesses next steps were made: 
1. Scripts are added into package.json file.
2. Created .yml file that executes tests.

