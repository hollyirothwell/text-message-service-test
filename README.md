# Text messaging service

Troubles:
* Provisioning AWS services from scratch is something I was not familiar with, so mostly followed documentation.
* Lambda modules could not be found during execution through API Gateway.
* Wasn't sure on the direction to take the SQS->lambda->SNS, the pushTextMessage function for SNS is set as a trigger lambda for the queue, but maybe I should have a different lambda that pull messages out -> then pushes them?
* Don't have experience with SNS, so I'm not entirely sure if what I've written would work.
* Jest tests are mostly placeholder/sudo code, as I'd need to do some research on mocking lambdas more effectively without an integration testing framework.
* Haven't given myself much time to think or consider logging.