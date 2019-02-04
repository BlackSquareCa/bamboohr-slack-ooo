# BambooHR to Slack Webhook Bot

Simple nodejs app that posts who is out of the office for the next week to a Slack webhook. 




## Getting Started

You will need to set some environment variables first; 

The subdomain from bamboo, i.e subdomain.bamboohr.com
```
export BAMBOOHR_SUBDOMAIN = subdomain
```

The Bamboo API key. You can get that from your Bamboo page  

>To generate an API key for a given user, users should log in and click their name in the upper right hand corner of any page to get to the user context menu. There will be an "API Keys" option in that menu to go to the page.
https://www.bamboohr.com/api/documentation/

```
export BAMBOOHR_TOKEN = {token}
```


Finally the Slack Webhook; 
https://api.slack.com/incoming-webhooks

```
export SLACK_WEBHOOK = {url}
```

### Prerequisites

Uses Botkit, 

```
yarn install
```

### Installing

We have installed this on AWS Lambda, but any node server will work. 

```
node index.js
```

https://hackernoon.com/setup-aws-lambda-with-scheduled-events-2840824ed1ad
Contains information on how to deploy it onto Lambda servers

## Testing

Tested on actual people


## Deployment

Add additional notes about how to deploy this on a live system


## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

Idea, execution and everything but the parsing came from here; 
* https://github.com/jonchurch/bambooHR-pto-bot
