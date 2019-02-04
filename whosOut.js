'use strict';
const request = require('request-promise-native')
const Botkit = require('botkit')
const parseXml = require('xml2js').parseString
const momentjs = require('moment')
const momentrange = require('moment-range')
const find = require('lodash.find')
const controller = Botkit.slackbot({})

const moment = momentrange.extendMoment(momentjs);

const bot = controller.spawn({
    incoming_webhook: {
        url: process.env.SLACK_WEBHOOK
    }
})

function whosOut() {
    const date = new Date()
    console.log('Whos out running\nCurrent time is: ' + date.getHours() + ':' + date.getMinutes())

    const startQuery = moment(date).format("YYYY-MM-DD");
    const endQuery = moment(date).add('7','days').format("YYYY-MM-DD");
    const options = {
       url: 'https://' + process.env.BAMBOOHR_TOKEN + ':x@api.bamboohr.com/api/gateway.php/' + process.env.BAMBOOHR_SUBDOMAIN + '/v1/time_off/whos_out/?start='+startQuery+'&end='+endQuery
    }

console.log(options);
    var data;

    request(options).then(function(xml) {
        parseXml(xml, function(err, result) {
            if (err) {
                console.log('XML PARSE ERROR:', err)
                return
            }
            
            const responseArray = []
            responseArray.push('*Who is out this week*');

            

            // Process Today
            if(result.calendar == null || result.calendar.length == 0 ){
                responseArray.push("All Hands OnBoard!")
            }else{
                result.calendar.item.forEach(item => {
                
                    const startDate = moment(item.start[0])
                    const endDate = moment(item.end[0])
                    const entryRange = moment.range(startDate, endDate)

                    var start = moment().startOf('day'); // set to 12:00 am today
                    var end = moment().endOf('day'); // set to 23:59 pm today
                    const today = moment.range(start,end)

                    //Setting week start to Monday
                    const weekStart = moment().startOf('isoweek')
                    //Setting week end to Friday
                    const weekEnd = moment().endOf('isoweek').subtract('2', 'days')
                    const thisWeek = moment.range(weekStart,weekEnd)

                    const eventDetails = {
                        name : item.employee[0]._,
                        start : startDate.isSame(start) ? " today" : startDate.format("MMM DD"),
                        end: startDate.isSame(endDate)?"": " to "+endDate.format("MMM DD")
                    }

                    if(item.$.type == "holiday"){
                        responseArray.push("🎉Company Holiday🎉 "+eventDetails.start+eventDetails.end)
                    }else if(item.$.type == "timeOff"){
                        const name = item.employee[0]._;
                        responseArray.push(eventDetails.name+" is off "+eventDetails.start+eventDetails.end)
                    }
                });

            }

            console.log(responseArray.join('\n\n'))

            bot.sendWebhook({
                text: responseArray.join('\n\n'),
                username: 'Bueller, Bueller Bot',
                icon_emoji: ':date:'
            }, function(err) {
                if (err) {
                    console.log(err)
                } else console.log('message sent!');
            });


        })
    })
}


function formatArrayToString(array) {
    if (array.length < 1) {
        console.log('formatArray needs an array with a length greater than 0!')
        return
    }
    let resultArr = []
    for (let i = 0; i < array.length; i += 1) {
        let newArr = []
        newArr.push('>' + '*' + array[i].name + '*')
        newArr.push('_' + array[i].days.join(', ') + '_')
        newArr = newArr.join(': ')
        resultArr.push(newArr)
    }
    return resultArr.join('\n')
}

module.exports = whosOut
