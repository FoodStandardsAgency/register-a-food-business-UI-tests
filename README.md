# Register a food business UI and E2E Tests

The User Interface (UI) and End-to-End (E2E) tests are automated to run by default on Azure Devops via Browserstack in Chrome. However you may want to run them manually when, for example, developing a new feature or if you want to test on a different browser.

How to test:

1. run in root: `./reset.sh && ./init_docker.sh` - Spin up full env (it needs to work)
2. if you are running selenium - run in root: `./init_selenium.sh`
3. shell in to the front-end-UI-test container in docker. `docker-compose exec front-end-ui-tests bash`
4. run one of the scripts in package.json under `scripts`

Using this functionality - you can:
 -  Test your local instance using selenium (completely local)
 -  Test your local instance using browserstack local (BS uses a tunnel - but you can test on non native platforms this way).
 -  Run your tests against any remote server on browser stack or selenium (set env BASE_URL=http://frontend.com/new)

Note - You may get timeouts if there is not sufficient resource.

Note - If you are dev testing - just stick to Chrome and Firefox.

Note - atow only 5 browser stack instances shared with the build pipeline. 
       You will probably get timeouts if there are not enough instances available.
