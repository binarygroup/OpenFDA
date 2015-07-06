# Open FDA Analytics
## Description ##
The development prototype, located at [http://openfda-production.elasticbeanstalk.com/ ](http://http://openfda-production.elasticbeanstalk.com/ )fetches adverse event data via the OpenFDA API (open.fda.gov/) and generates charts and tables according to user-defined filters.
## Technical Approach ##
Our team applied Binary Group’s agile development methodology, ODEA™, to wrap Agile/Scrum with discovery, planning, architecting and DevOps, while ensuring continuous user engagement and alignment from project initiation to completion. We followed the Digital Playbook guiding principles throughout, and provided evidence in the repository at [https://github.com/binarygroup/OpenFDA/blob/master/artifacts/Digital%20Playbook%20Mapping.xlsx](https://github.com/binarygroup/OpenFDA/blob/master/artifacts/Digital%20Playbook%20Mapping.xlsx) to trace project results and artifact alignment to those principles. In sections a-l below, we describe our approach to Pool Two Development:

	
a.  The Pool 1 Product Manager was assigned as team leader, and given authority, responsibility and accountability for the quality of the Pool 2 prototype. Without the “Category 1 - Product Manager” labor category, we were not able to reflect the hours spent by the assigned leader in Attachments B and C.

b.	We composed a multidisciplinary, experienced and collaborative Scrum team to address Pool 2 tasks, including a Frontend Web Developer, Backend Web Developer and DevOps Engineer. Labor tracking tools were established to track costs, team collaboration tools were identified to maximize communication, and the team repository was selected and created. During daily Scrum meetings, combined Pool 1 and Pool 2 Scrum teams met for 30 minutes to review accomplishments, plans and issues. In a parallel Pool 1 activity, a set of epics and related user stories that formed an initial Product Backlog was developed, based on research and interactive user story development conducted with FDA and pharmaceutical industry user subject matter experts (SMEs). The Pool 1 team developed initial design prototypes and met with a user SME a couple of times to review and get feedback on revisions to better support the selected user stories. These results and prototypes were shared with the Pool 2 Scrum team in order to help determine the data needed to extract from the API as well as data views and filters needed to deliver the best visualizations. 
 
c.	The Technical Architect explored and analyzed the Open FDA API architecture and alternative technical solutions, and selected a set of Pool 2 open source technologies including: Ruby on Rails, AngularJS, Docker, Nginx and D3. The choice was made to develop with Angular JS by referencing the Elasticsearch Kibana open source code, rather than modifying a fork of Kibana to directly access the Open FDA API.

d.	The Pool 2 Scrum team then agreed upon the open source stack, PAAS environment (Amazon Elastic Beanstalk), and associated tools for the project.

e.	Since we are consuming the OpenFDA API, tests were run to ensure that the API was working and that the JSON responses conformed to the schema as built in the application.

f.	We used Travis CI for continuous integration so that automated tests are run upon each integration to the master Git branch. Set up was a simple process involving setting up an account, creating a .yml file and adding environment variables.

g.	New Relic was used for continuous monitoring, providing a dashboard for analyzing real-time application performance. Set up was very straightforward as they provided a Ruby gem.

h.	AWS Elastic Beanstalk was used to provide dynamic configuration management via capacity provisioning, load balancing, auto-scaling and application health monitoring.

i.	The application was deployed within a Docker container, so it contains all the configuration software the application requires to run. Docker is supported by AWS Elastic Beanstalk, which makes deployment very simple and fast.

j.	The Pool 2 developers released prototypes incrementally to users, composed largely of the Pool 1 Scrum Team, to validate and test the direction of included functionality and the user experience. A final Sprint Review meeting was held with the user SME, and the final development prototype was accepted.

k.	Installation instructions were developed to describe how to install and run the prototype on another machine. These instructions were independently tested to ensure they could be successfully followed to reproduce the prototype.

l. The prototype was delivered in an openly licensed and free of charge deployment environment.