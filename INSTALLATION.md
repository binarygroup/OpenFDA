# How to Install and Run Locally #

Note. These instructions are with respect to a ubuntu 14.04 server.

Ruby version: 2.1.5

# Development Setup #

## Setup AWS Account ##

* Login to the AWS Account

* Go to EC2 console.

* Create a ssh keypair

* Launch a new instance with ubuntu 14.04 ami, atleast 4 Gb of ram and above created keypair

* Login to EC2 via ssh using the keypair

## Server Setup ##

* Update apt cache

	sudo apt-get update

* Install git

	sudo apt-get install git nodejs

* Install rvm

	gpg --keyserver hkp://keys.gnupg.net --recv-keys 409B6B1796C275462A1703113804BB82D39DC0E3
	
	\curl -sSL https://get.rvm.io | bash
	
	source ~/.bashrc
	
	rvm install ruby-2.1.5
	
	rvm rubygems current

* Open a new shell and clone the Repo

	git clone <repo>
	
	cd <cloned repo>
	
## Setup Rails app ##

* Install system dependencies

	gem install bundler
	
	bundle install

## Run app ##

	rails s -p 3000 -b 0.0.0.0
	
	Now open port 3000 using AWS security groups. Open <server_ip>:3000 in browser.

## Testing ##

Run the test suite

	bundle exec rake spec
	
# Production Deployment instructions #

Before deploying, you need to run the asset pipeline to build the static assets

	RAILS_ENV=production spring rake assets:precompile
	
Push the code to the master branch. Once Travis CI runs all the tests associated with the repo it will auto-deploy to Elastic Beanstalk

	git push origin master
	
* Continuous Integration

For viewing continuous integration status, check Travis CI at travis-ci.org/binarygroup/OpenFDA

## Continuous Monitoring ##

For error and performance monitoring, check the New Relic dashboard at rpm.newrelic.com/accounts/1028379/applications

For server monitoring, check the AWS Elastic Beanstalk console

## Setup Travis CI ##

* Its very straight forward to setup travis-ci, following are the steps:

* Create a travis ci account via github account

* Give access to repo to travis ci

* Add a `.travis.yml` file to the project root which defines all the configuration,

* Add environment variables in the travis ci, which are mentioned in .travis.yml with `$` prefix

Now upon every new commit push, the travis ci will be invoked

## Setup New Relic ##

New Relic provide a gem and a license file, just add the gem to the Gemfile, run and add the license in the config/ folder.

* Signup for a newrelic account

* Create a new app, and download the license yml file

* Add `newrelic` gem to Gemfile

* Run `bundle install`

* Add the license to config/ folder

* Tweak the configuration as required in the license file.

## Setup Docker ##

All the docker relation config is in Dockerfile in the project root. To make a container, here are the steps:

* Install Docker

	sudo apt-get install docker

* Build docker container

* switch to the project root directory

	docker build -t openfda .
	
* Run docker container

	docker run -it -p 3000:80 openfda

Open localhost:3000 in the browser to try it out.

## Server Configuration Management ##

Elastic Beanstalk provides a command line as well as web UI for managing the infrastructure configuration.

# Production Setup using AWS #

## Setup App ##

* Login to AWS Account

* Go to AWS Elasticbeanstalk console.aws.amazon.com/elasticbeanstalk/home

* Create a new application with the following steps/configuration

	Enter Application name: OpenfdaXXXX
	
	Create webserver button
	
	Select Platform: Generic > Docker
	Environment Type: Load Balancing
	
	Chose Sample Application and click next
	
	Environment name: OpenfdaXXXX-production
	Environment url: Make sure the url is unique
	
	No need to create RDS or VPC, just skip it by clicking next
	
	Select a keypair or generate it via AWS EC2 console, click next
	
	Skip Environment Tags
	
	Click Launch to start creating the stack.

## Deployment Configuration ##

Elasticbeanstalk read docker related information from 2 files in the project root

* Dockerrun.json

* Dockerfile

Modify these files only if required to change existing setup.

Deploy New Code

* Make a zip of the latest code

* git archive HEAD –format=zip > openfda-latest.zip

* Go to Dashboard of web app

* Click Upload and Deploy button

* Select the above created zip.

* Let the magic happen.

* Once it turned to green, should be able to access it via the url provided by elasticbeanstalk app
